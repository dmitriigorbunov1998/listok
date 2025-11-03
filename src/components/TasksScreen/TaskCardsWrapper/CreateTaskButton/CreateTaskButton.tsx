import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './CreateTaskButton.css';

interface CreateTaskButtonProps {
    onClick: () => void;
}

export const CreateTaskButton = ({ onClick }: CreateTaskButtonProps) => {
    return (
        <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={onClick}
            className='button'
        >
            Создать задачу
        </Button>
    );
};