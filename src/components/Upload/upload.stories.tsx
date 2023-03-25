import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Upload from './upload';

// beforeUpload 的第一个功能
const checkFileSize = (file: File) => {
    if (Math.round(file.size / 1024) > 50) {
        alert('file too big');
        return false;
    }
    return true;
};

// beforeUpload 的第二个功能
const filePromise = (file: File) => {
    const newFile = new File([file], 'new_vv_name.docx', { type: file.type });
    return Promise.resolve(newFile);
};

export default {
    title: 'Upload ',
    component: Upload
} as ComponentMeta<typeof Upload>;

export const SimpleUpload: ComponentStory<typeof Upload> = () => {
    return (
        <Upload
            action="https://vgzai.free.beeceptor.com"
            onChange={action('changed')}
            onRemove={action('removed')}
            name="filename_vv"
            data={{ key: 'value' }}
            headers={{ 'X-Powered-By': 'viiii' }}
            multiple
            // accept=".png"
            drag
            // beforeUpload={filePromise}
            // onProgress={action('progress')}
            // onSuccess={action('success')}
            // onError={action('error')}
        />
    );
};
