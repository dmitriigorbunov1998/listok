import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './AddTaskButton.module.css';

interface AddTaskButtonProps {
    onClick: () => void;
}

export const AddTaskButton = ({ onClick }: AddTaskButtonProps) => {
    return (
        <div className={styles.container}>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={onClick}
                size="large"
            >
                Добавить задачу
            </Button>
        </div>
    );
};