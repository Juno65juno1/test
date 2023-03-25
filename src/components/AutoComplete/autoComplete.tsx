import React, {
    FC,
    useState,
    useEffect,
    useRef,
    ChangeEvent,
    ReactElement,
    KeyboardEvent
} from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from './../../hooks/useClickOutside';

export interface DataSourceObject {
    value: string;
}

// 为了支持接收更多的数据结构，采用泛型
export type DataSourceType<T = {}> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (
        str: string
    ) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
    const { fetchSuggestions, onSelect, value, renderOption, ...restProps } =
        props;

    const [inputValue, setInputValue] = useState(value as string);
    const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
    const [loading, setLoading] = useState(false);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const triggerSearch = useRef(false);
    const componentRef = useRef<HTMLDivElement>(null);

    const debouncedValue = useDebounce(inputValue, 500);

    useClickOutside(componentRef, () => {
        setSuggestions([]);
    });

    useEffect(() => {
        // 拿到延时后的搜索结果
        if (debouncedValue && triggerSearch.current) {
            const results = fetchSuggestions(debouncedValue);
            // 如果Promise,发送异步请求
            if (results instanceof Promise) {
                // console.log('triggered');
                setLoading(true);
                results.then((data) => {
                    setLoading(false);
                    setSuggestions(data);
                });
                // 不是Promise 照旧发results
            } else {
                setSuggestions(results);
            }
        } else {
            setSuggestions([]);
        }
        setHighlightIndex(-1);
    }, [debouncedValue]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        // 拿到输入的值
        const value = e.target.value.trim();
        setInputValue(value);
        triggerSearch.current = true;
    };

    // 点击条目触发 handleSelect。
    const handleSelect = (item: DataSourceType) => {
        // 将点击值填充到下拉菜单
        setInputValue(item.value);
        // 清空下拉菜单
        setSuggestions([]);
        // 触发 onSelect()
        if (onSelect) {
            onSelect(item);
        }
        triggerSearch.current = false;
    };

    const highlight = (index: number) => {
        if (index < 0) index = 0;
        if (index >= suggestions.length) index = suggestions.length - 1;
        setHighlightIndex(index);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        switch (e.keyCode) {
            // enter键
            case 13:
                if (suggestions[highlightIndex]) {
                    handleSelect(suggestions[highlightIndex]);
                }
                break;
            // ↑上键
            case 38:
                highlight(highlightIndex - 1);
                break;
            // ↓下键
            case 40:
                highlight(highlightIndex + 1);
                break;
            // esc键
            case 27:
                setSuggestions([]);
                break;
            default:
                break;
        }
    };

    // 根据是否传入renderOption属性 来确定展示的模板
    const renderTemplate = (item: DataSourceType) => {
        return renderOption ? renderOption(item) : item.value;
    };

    // 生成下拉菜单
    const generateDropDown = () => {
        return (
            <ul className="vii-suggestions-list">
                {suggestions.map((item, index) => {
                    const cnames = classNames('suggestions-item', {
                        'item-highlighted': index === highlightIndex
                    });
                    return (
                        <li
                            key={index}
                            className={cnames}
                            onClick={() => handleSelect(item)}
                        >
                            {/* 展示的是自定义模板 */}
                            {renderTemplate(item)}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="vii-auto-complete" ref={componentRef}>
            <Input
                value={inputValue}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                {...restProps}
            />
            {loading && (
                <div className="suggestions-loading-icon">
                    <Icon icon="spinner" spin />
                </div>
            )}
            {suggestions.length > 0 && generateDropDown()}
        </div>
    );
};
