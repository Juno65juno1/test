import React, { FC, useRef, useState } from 'react';
import axios from 'axios';
import Button from '../Button/button';
import { UploadList } from './uploadList';
import Dragger from './dragger';

export interface UploadProps {
    action: string;
    defaultFileList?: UploadFile[];
    beforeUpload?: (file: File) => boolean | Promise<File>;
    onProgress?: (percentage: number, file: File) => void;
    onSuccess?: (data: any, file: File) => void;
    onError?: (err: any, file: File) => void;
    onChange?: (file: File) => void;
    onRemove?: (file: UploadFile) => void;
    headers?: { [key: string]: any };
    name?: string;
    data?: { [key: string]: any };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    children?: React.ReactNode;
    drag?: boolean;
}

export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
export interface UploadFile {
    uid: string;
    size: number;
    name: string;
    status?: UploadFileStatus;
    percent?: number;
    raw?: File;
    response?: any;
    error?: any;
}

export const Upload: FC<UploadProps> = (props) => {
    const {
        action,
        beforeUpload,
        onProgress,
        onSuccess,
        onError,
        onChange,
        defaultFileList,
        onRemove,
        headers,
        name,
        data,
        withCredentials,
        accept,
        multiple,
        children,
        drag
    } = props;

    const fileInput = useRef<HTMLInputElement>(null);
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    // 创建一个可多次使用的包装板块，用于获得上次的值来更新onProgress\onSuccess\onError
    const updateFileList = (
        updateFile: UploadFile,
        updateObj: Partial<UploadFile>
    ) => {
        setFileList((prevList) => {
            return prevList.map((file) => {
                if (file.uid === updateFile.uid) {
                    return { ...file, ...updateObj };
                } else {
                    return file;
                }
            });
        });
    };

    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };

    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter((item) => item.uid !== file.uid);
        });
        if (onRemove) {
            onRemove(file);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) {
            return;
        }
        // 如果存在 files 就触发uploadFiles
        uploadFiles(files);
        console.log('~~~', fileInput);
        // 如果存在 fileInput.current，就清空它
        if (fileInput.current) {
            console.log('@@@', fileInput);
            fileInput.current.value = '';
        }
    };

    const uploadFiles = (files: FileList) => {
        // 先把files转成数组
        let postFiles = Array.from(files);
        postFiles.forEach((file) => {
            if (!beforeUpload) {
                post(file);
            } else {
                const result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then((processedFile) => {
                        post(processedFile);
                    });
                } else if (result !== false) {
                    post(file);
                }
            }
        });
    };

    // 把 file 上传的过程都归在 post 里面
    const post = (file: File) => {
        // 设置初始
        let _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        setFileList((prevList) => {
            return [_file, ...prevList];
        });

        const formData = new FormData();
        // 将 name 自定义
        formData.append(name || 'file', file);
        // 自定义 formData
        if (data) {
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
                headers: {
                    // 将 headers 自定义
                    ...headers,
                    'Content-Type': 'multipart/form-data'
                },
                // 是否需要携带cookie -withCredentials
                withCredentials,
                onUploadProgress: (e) => {
                    let percentage =
                        Math.round((e.loaded * 100) / e.total) || 0;
                    if (percentage < 100) {
                        updateFileList(_file, {
                            percent: percentage,
                            status: 'uploading'
                        });
                        if (onProgress) {
                            onProgress(percentage, file);
                        }
                    }
                }
            })
            .then((resp) => {
                updateFileList(_file, {
                    status: 'success',
                    response: resp.data
                });
                if (onSuccess) {
                    onSuccess(resp.data, file);
                }
                if (onChange) {
                    onChange(file);
                }
            })
            .catch((err) => {
                updateFileList(_file, {
                    status: 'error',
                    response: err
                });
                if (onError) {
                    onError(err, file);
                }
                if (onChange) {
                    onChange(file);
                }
            });
    };
    console.log(fileList);

    return (
        <div className="" vii-upload-component>
            <div
                className="vii-upload-input"
                style={{ display: 'inline-block' }}
                onClick={handleClick}
            >
                {/* button式 点击上传 */}
                {/* <Button btnType="primary" onClick={handleClick}>
                上传文件
            </Button> */}
                {/* 用children代替button */}
                {drag ? (
                    <Dragger
                        onFile={(files) => {
                            uploadFiles(files);
                        }}
                    >
                        {children}
                    </Dragger>
                ) : (
                    children
                )}
                <input
                    type="file"
                    className="vii-file-input"
                    style={{ display: 'none' }}
                    ref={fileInput}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                />
            </div>
            <UploadList fileList={fileList} onRemove={handleRemove} />
        </div>
    );
};

Upload.defaultProps = {
    name: 'file'
};

export default Upload;
