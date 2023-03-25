import React, { createContext, useState } from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical';
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    onSelect?: SelectCallback;
}
interface IMenuContext {
    index: string;
    mode?: MenuMode;
    onSelect?: SelectCallback;
}

export const MenuContext = createContext<IMenuContext>({ index: '0' });

const Menu: React.FC<MenuProps> = (props) => {
    const { defaultIndex, className, mode, style, children, onSelect } = props;
    const [currentActive, setActive] = useState(defaultIndex);

    const handleClick = (index: string) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick
        // mode
    };

    const classes = classNames('vii-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical'
    });

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement =
                child as React.FunctionComponentElement<MenuItemProps>;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            } else {
                console.log(
                    'Warning: Menu has a child which is not a MenuItem component'
                );
            }
        });
    };

    return (
        <ul className={classes} style={style} data-testid="test-menu">
            <MenuContext.Provider value={passedContext}>
                {renderChildren()}
            </MenuContext.Provider>
        </ul>
    );
};

Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal'
};

export default Menu;
