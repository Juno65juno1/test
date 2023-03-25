import React, { ReactElement, InputHTMLAttributes, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import Icon from '../Icon/icon';

type InputSize = 'lg' | 'def' | 'sm';

export interface BaseInputProps {
    /**设置 Input 的禁用 */
    disabled?: boolean;
    /**设置 input 的尺寸 */
    size?: InputSize;
    /**添加图标，在右侧悬浮添加一个图标，用于提示 */
    icon?: IconProp;
    /**添加前缀，用于配置一些固定组合 */
    prepend?: string | ReactElement;
    /**添加后缀，用于配置一些固定组合 */
    append?: string | ReactElement;
    /**添加占位符 */
    placeholder?: string;
    // Input作为受控组件 的优化
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

// ts新知识点：Omit<Type, Keys>
export type InputProps = BaseInputProps &
    Omit<InputHTMLAttributes<HTMLElement>, 'size'>;

/**
 *
 * 输入框，通过鼠标或键盘输入内容，是最基础的表单域的包装。
 * ### 何时使用
 * - 需要用户输入表单域内容时。
 * - 提供组合型输入框，带图标的输入框，还可以进行大小选择。
 *
 * ### 引用方法
 * `import { Input } from 'viidesign'`
 *
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: React.FC<InputProps> = (props) => {
    // 取出各种属性
    const {
        disabled,
        size,
        icon,
        prepend,
        append,
        style,
        placeholder,
        ...restProps
    } = props;

    // 根据属性计算不同的className
    const classes = classNames('vii-input-wrapper', {
        [`input-${size}`]: size,
        'is-disabled': disabled,
        'input-group': prepend || append,
        'input-group-prepend': !!prepend,
        'input-group-append': !!append
    });

    // Input作为受控组件 的优化
    const fixControlledValue = (value: any) => {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }

    return (
        // 根据属性判断是否添加不同的节点
        <div className={classes} style={style}>
            {/* prepend 显示 */}
            {prepend && <div className="vii-input-prepend">{prepend}</div>}
            {/* icon 显示 */}
            {icon && (
                <div className="icon-wrapper">
                    <Icon icon={icon} title={`title-${icon}`} />
                </div>
            )}
            {/* input 默认显示 */}
            <input
                className="vii-input-inner"
                disabled={disabled}
                placeholder={placeholder}
                {...restProps}
            />
            {/* append 显示 */}
            {append && <div className="vii-input-append">{append}</div>}
        </div>
    );
};

export default Input;
