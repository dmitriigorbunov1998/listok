'use client';

import { Modal, Form, Input, Select, Button } from 'antd';
import { Project, User } from '@/types';
import { useCreateTask } from '@/hooks/useCreateTask';

interface TaskModalWindowProps {
    isVisible: boolean;
    onClose: () => void;
    users: User[];
    projects: Project[];
    onCreate: () => void;
    type: String;
    description?: String;
    taskTitle?: String;
}

export const TaskModalWindow = ({
    isVisible,
    onClose,
    users,
    projects,
    onCreate,
    type,
    description,
    taskTitle
}: TaskModalWindowProps) => {
    const [form] = Form.useForm();
    const { createTask } = useCreateTask();

    const title = type === 'create' ? 'Создание новой задачи' : 'Редактирование текущей задачи';

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            const success = await createTask(values);

            if (success) {
                form.resetFields();
                onCreate();
                onClose();
            }
        } catch (validationError) {
            console.error('Validation error:', validationError);
        }
    };

    return (
        <Modal
            title={title}
            open={isVisible}
            onCancel={onClose}
            footer={
                [
                    <Button
                        key="cancel"
                        onClick={onClose}
                    >
                        Отмена
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={handleSubmit}
                    >
                        Создать
                    </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    description: description,
                    title: taskTitle,
                }}
            >
                <Form.Item
                    name="title"
                    label="Название задачи"
                >

                    <Input
                        placeholder="Введите название задачи"   
                    />

                </Form.Item>

                <Form.Item
                    name="projectId"
                    label="Проект" 
                    rules={
                        [
                            {
                                required: true,
                                message: 'Выберите проект'
                            }
                        ]
                    }
                >

                    <Select
                        placeholder="Выберите проект"
                    >
                        {
                            projects.map(project => (
                                <Select.Option
                                    key={project.id}     
                                    value={project.id}
                                >
                                    {project.name}
                                </Select.Option>
                            ))
                        }
                    </Select>

                </Form.Item>

                <Form.Item
                    name="description"
                    label="Описание"
                >

                    <Input.TextArea
                        placeholder="Опишите задачу"
                        rows={4}
                    />

                </Form.Item>

                <Form.Item
                    name="assigneeId"
                    label="Исполнитель"
                    rules={
                        [
                            {
                                required: true,
                                message: 'Выберите исполнителя'
                            }
                        ]
                    }
                >

                    <Select
                        placeholder="Выберите исполнителя"
                    >
                        {
                            users.map(user => (
                                <Select.Option
                                    key={user.id}
                                    value={user.id}
                                >
                                    {user.name}
                                </Select.Option>
                            ))
                        }
                    </Select>

                </Form.Item>
            </Form>
        </Modal>
    );
};