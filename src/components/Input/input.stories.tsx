import React, { useState, ChangeEvent } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Input } from './input';

// Input作为受控组件
/* const ControlledInput = () => {
    const [value, setValue] = useState('');
    return (
        <Input
            value={value}
            defaultValue={value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setValue(e.target.value);
            }}
        />
    );
}; */

export default {
    title: 'Input 输入框',
    component: Input
} as ComponentMeta<typeof Input>;

// 默认输入框
export const defaultInput: ComponentStory<typeof Input> = () => (
    <>
        <Input
            placeholder="优雅漂亮的 Input"
            style={{ width: '300px' }}
            onChange={action('changed')}
        />
        {/*  <ControlledInput /> */}
    </>
);
defaultInput.storyName = '默认 Input';
defaultInput.story = {
    parameters: {
        docs: { storyDescription: '默认输入框设计。' }
    }
};

//被禁用的输入框
export const disabledInput: ComponentStory<typeof Input> = () => (
    <Input placeholder="被禁用的 Input" style={{ width: '300px' }} disabled />
);
disabledInput.storyName = '被禁用的 Input';
disabledInput.story = {
    parameters: {
        docs: { storyDescription: '被禁用的输入框设计。' }
    }
};

// 带图标的输入框
export const iconInput: ComponentStory<typeof Input> = () => (
    <Input
        placeholder="带图标的 Input"
        style={{ width: '300px' }}
        icon="heart"
    />
);
iconInput.storyName = '带图标的 Input';
iconInput.story = {
    parameters: {
        docs: { storyDescription: '带图标的输入框设计。' }
    }
};

// 不同尺寸的输入框
export const inputWithSize: ComponentStory<typeof Input> = () => (
    <>
        <Input style={{ width: '300px' }} size="lg" placeholder="large input" />
        <Input
            style={{ width: '300px' }}
            size="def"
            placeholder="default input"
        />
        <Input style={{ width: '300px' }} size="sm" placeholder="small input" />
    </>
);
inputWithSize.storyName = '不同尺寸的 Input';
inputWithSize.story = {
    parameters: {
        docs: { storyDescription: '有3种尺寸的输入框可供选择：lg、def、sm 。' }
    }
};

// 带前后缀的输入框
export const inputWithPend: ComponentStory<typeof Input> = () => (
    <>
        <Input
            style={{ width: '300px' }}
            placeholder="请输入文字"
            prepend="https://"
        />
        <Input
            style={{ width: '300px' }}
            placeholder="请输入文字"
            append=".com"
        />
        <Input
            style={{ width: '300px' }}
            placeholder="请输入文字"
            prepend="https://"
            append=".com"
        />
    </>
);
inputWithPend.storyName = '带前后缀的 Input';
inputWithPend.story = {
    parameters: {
        docs: { storyDescription: '有前缀、后缀两种可供选择 。' }
    }
};
