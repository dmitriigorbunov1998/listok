'use client';

import { Modal, Form, Input, Select, Button } from 'antd';
import { User } from '@/types';

interface TaskModalWindowProps {
    isVisible: boolean;
    onClose: () => void;
    onCreate: (taskData: any) => void;
    users: User[];
}

export const TaskModalWindow = ({
                                    isVisible,
                                    onClose,
                                    onCreate,
                                    users
                                }: TaskModalWindowProps) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then(values => {
            onCreate(values);
            form.resetFields();
        });
    };

    return (
        <Modal
            title="Создание новой задачи"
            open={isVisible} // Заменяем visible на open
            onCancel={onClose}
            footer={[
                <Button key="cancel" onClick={onClose}>
                    Отмена
                </Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>
                    Создать
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
            >
                <Form.Item
                    name="title"
                    label="Название задачи"
                    rules={[{ required: true, message: 'Введите название задачи' }]}
                >
                    <Input placeholder="Введите название задачи" />
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Описание"
                >
                    <Input.TextArea placeholder="Опишите задачу" rows={4} />
                </Form.Item>

                <Form.Item
                    name="assignee_id"
                    label="Исполнитель"
                    rules={[{ required: true, message: 'Выберите исполнителя' }]}
                >
                    <Select placeholder="Выберите исполнителя">
                        {users.map(user => (
                            <Select.Option key={user.id} value={user.id}>
                                {user.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="priority"
                    label="Приоритет"
                >
                    <Select placeholder="Выберите приоритет">
                        <Select.Option value="low">Низкий</Select.Option>
                        <Select.Option value="medium">Средний</Select.Option>
                        <Select.Option value="high">Высокий</Select.Option>
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};