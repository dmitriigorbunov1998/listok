'use client';

import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './CreateTaskButton.module.css';

interface CreateTaskButtonProps {
    onClick: () => void;
}

export const CreateTaskButton = ({ onClick }: CreateTaskButtonProps) => {
    return (
        <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onClick}
            className={styles.createButton}
        >
            Создать задачу
        </Button>
    );
};