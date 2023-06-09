import { Span } from '@storybook/components';
import React, { FC } from 'react';
import { ThemeProps } from '../Icon/icon';

export interface ProgressProps {
    percent: number;
    strokeHight?: number;
    showText?: boolean;
    styles?: React.CSSProperties;
    theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = (props) => {
    const { percent, strokeHight, showText, styles, theme } = props;

    return (
        <div className="vii-progress-bar">
            <div
                className="vii-progress-bar-outer"
                style={{ height: `${strokeHight}px` }}
            >
                <div
                    className={`vii-progress-bar-inner color-${theme}`}
                    style={{ width: `${percent}%` }}
                >
                    {showText && (
                        <span className="inner-text">{`${percent}%`}</span>
                    )}
                </div>
            </div>
        </div>
    );
};

Progress.defaultProps = {
    strokeHight: 15,
    showText: true,
    theme: 'primary'
};

export default Progress;
