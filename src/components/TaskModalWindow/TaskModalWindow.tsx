'use client';

import { Modal, Form, Input, Select, Button } from 'antd';
import { Project, User } from '@/types';

interface TaskModalWindowProps {
    isVisible: boolean;
    onClose: () => void;
    users: User[];
    projects: Project[];
    onCreate: () => void;
}

export const TaskModalWindow = ({isVisible, onClose, users, projects,}: TaskModalWindowProps) => {
    const [form] = Form.useForm();

    const handleSubmit = () => {
        form.validateFields().then(values => {
            fetch('/api/createTask', {
                method: 'POST',
                headers: {
                    contentType: 'application/json'
                },
                body: JSON.stringify({
                    ...values,
                    creatorId: 1, // Временно
                }),
            }).then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error('Ошибка при выполнении запроса');
                }
            }).then((data) => {
                console.log(data);
                onClose();
            })
            form.resetFields();
        });
    };

    return (
        <Modal title="Создание новой задачи" open={isVisible} onCancel={onClose} footer={[
                <Button key="cancel" onClick={onClose}>Отмена</Button>,
                <Button key="submit" type="primary" onClick={handleSubmit}>Создать</Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item name="title" label="Название задачи" rules={[{ required: true, message: 'Введите название задачи' }]}>
                    <Input placeholder="Введите название задачи" />
                </Form.Item>

                <Form.Item name="projectId" label="Проект" rules={[{ required: true, message: 'Выберите проект' }]}>
                    <Select placeholder="Выберите проект">{projects.map(project => (
                            <Select.Option key={project.id} value={project.id}>{project.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="description" label="Описание">
                    <Input.TextArea placeholder="Опишите задачу" rows={4} />
                </Form.Item>

                <Form.Item name="assigneeId" label="Исполнитель" rules={[{ required: true, message: 'Выберите исполнителя' }]}>
                    <Select placeholder="Выберите исполнителя">{users.map(user => (
                            <Select.Option key={user.id} value={user.id}>{user.name}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};