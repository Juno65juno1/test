import React from 'react';
import { addDecorator } from '@storybook/react';
import '../src/styles/index.scss';

export const parameters = {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/
        }
    }
};

const wrapperStyle: React.CSSProperties = {
    padding: '20px 40px'
};
const titleStyle: React.CSSProperties = {
    marginBottom: '10px'
};

const storyWrapper = (storyFn: any) => (
    <div style={wrapperStyle}>{storyFn()}</div>
);
addDecorator(storyWrapper);
