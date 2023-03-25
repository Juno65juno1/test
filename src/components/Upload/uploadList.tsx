import React, { FC } from 'react';
import { UploadFile } from './upload';
import Icon from '../Icon/icon';
import Progress from '../Progress/progress';

interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
    const { fileList, onRemove } = props;

    return (
        <ul className="vii-upload-list">
            {fileList.map((item) => {
                return (
                    <li className="vii-upload-list-item" key={item.uid}>
                        {/* 文件图标 和 文件名 */}
                        <span className={`file-name file-name-${item.status}`}>
                            <Icon icon="file-alt" theme="secondary" />
                            {item.name}
                        </span>
                        {/* 不同文件状态 显示 不同状态图标 */}
                        <span className="file-status">
                            {(item.status === 'uploading' ||
                                item.status === 'ready') && (
                                <Icon icon="spinner" spin theme="primary" />
                            )}
                            {item.status === 'success' && (
                                <Icon icon="check-circle" theme="success" />
                            )}
                            {item.status === 'error' && (
                                <Icon icon="times-circle" theme="danger" />
                            )}
                        </span>
                        {/* hover上去显示删除图标 */}
                        <span className="file-actions">
                            <Icon
                                icon="times"
                                onClick={() => {
                                    onRemove(item);
                                }}
                            />
                        </span>
                        {/*onProgress时 显示 Progress */}
                        {item.status === 'uploading' && (
                            <Progress percent={item.percent || 0} />
                        )}
                    </li>
                );
            })}
        </ul>
    );
};
