import classNames from 'classnames';
import React from 'react';

export type ButtonType =
    | 'primary'
    // 'secondary',
    | 'default'
    | 'danger'
    | 'link';
//  'round'

export type ButtonSize = 'lg' | 'sm' | 'md';

interface BaseButtonProps {
    className?: string;
    /**设置 Button 的禁用 */
    disabled?: boolean;
    /**设置 Button 的尺寸 */
    size?: ButtonSize;
    /**设置 Button 的类型 */
    btnType?: ButtonType;
    children: React.ReactNode;
    /**设置 link button 的跳转链接 */
    href?: string;
}

// intersection type交叉类型
// typescript自带的，涵盖button anchor的所有原生属性
type NativeButtonProps = BaseButtonProps &
    React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
    React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 *
 * 按钮用于开始一个即时操作。
 * ### 何时使用
 * 标记了一个（或封装一组）操作命令，响应用户点击行为，触发相应的业务逻辑。
 *
 * 在 Vii Design 中我们提供了三个尺寸。
 * - 大按钮：尺寸最大，适用于强调行动点。
 * - 中按钮：尺寸适中，适用于常见行动点。
 * - 小按钮：尺寸最小，适用于弱行动点。
 *
 * 在 Vii Design 中我们提供了四种按钮。
 * - 主按钮：用于主行动点，一个操作区域只能有一个主按钮。
 * - 默认按钮：用于没有主次之分的一组行动点。
 * - 警告按钮：用于警告行动点。
 * - 链接按钮：一般用于链接，即导航至某位置。
 *
 * ### 引用方法
 * `import {Button} from 'viidesign'`
 */

export const Button: React.FC<ButtonProps> = (props) => {
    const {
        disabled,
        size,
        btnType,
        children,
        href,
        //如果用户自定义了className会自动添加上去
        className,
        // 剩下的所有props
        ...restProps
    } = props;

    // btn,btn-lg,btn-primary
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        disabled: btnType === 'link' && disabled
    });

    if (btnType === 'link' && href) {
        return (
            <a className={classes} href={href} {...restProps}>
                {children}
            </a>
        );
    } else {
        return (
            <button className={classes} disabled={disabled} {...restProps}>
                {children}
            </button>
        );
    }
};

Button.defaultProps = {
    disabled: false,
    btnType: 'default'
};

export default Button;
