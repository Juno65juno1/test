/* import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from './button';

const defaultButton = () => (
    <Button onClick={action('clicked')}> default button </Button>
);

const buttonWithSize = () => (
    <>
        <Button size="lg">large button</Button>
        <Button size="sm">small button</Button>
    </>
);

const buttonWithType = () => (
    <>
        <Button btnType="primary">primary button</Button>
        <Button btnType="danger">danger button</Button>
        <Button btnType="link" href="https://google.com">
            link button
        </Button>
    </>
);

storiesOf('Button 按钮', module)
    .add('Button', defaultButton)
    .add('不同尺寸的 Button', buttonWithSize)
    .add('不同类型的 Button', buttonWithType); */

// ====================================================================
// Component Story Format (CSF)
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './button';

export default {
    title: 'Button 按钮',
    component: Button,
    parameters: {
        // componentSubtitle: '按钮用于开始一个即时操作。'
    },
    argTypes: {
        btnType: {
            options: ['link', 'default', 'primary', 'danger']
        }
    }
} as ComponentMeta<typeof Button>;

// 默认按钮
export const Default: ComponentStory<typeof Button> = () => (
    <Button onClick={() => 'clicked'}>default button</Button>
);
Default.storyName = '默认 Button';
Default.story = {
    parameters: {
        docs: { storyDescription: '默认按钮设计。' }
    }
};

// 不同尺寸按钮
export const buttonWithSize: ComponentStory<typeof Button> = () => (
    <>
        <Button size="lg">large button</Button>
        <Button size="md">middle button</Button>
        <Button size="sm">small button</Button>
    </>
);
buttonWithSize.storyName = '不同尺寸的 Button';
buttonWithSize.story = {
    parameters: {
        docs: { storyDescription: '有3种尺寸的按钮可供选择：lg、md、sm 。' }
    }
};

// 不同类型的按钮
export const buttonWithType: ComponentStory<typeof Button> = () => (
    <>
        <Button btnType="danger">danger button</Button>
        <Button btnType="primary">primary button</Button>
        <Button btnType="default">default button</Button>
        <Button btnType="link" href="https://google.com">
            link button
        </Button>
    </>
);
buttonWithType.storyName = '不同类型的 Button';
buttonWithType.story = {
    parameters: {
        docs: {
            storyDescription:
                '有4种类型的按钮可供选择：primary、default、danger、link 。'
        }
    }
};
