'use client';

import { Modal, Form, Input, Select, Button } from 'antd';
import { Project, Task, User } from '@/types';
import { useCreateTask } from '@/hooks/useCreateTask';
import { useEditTask } from '@/hooks/useEditTask';
import { useEffect } from 'react';

interface TaskModalWindowProps {
    isOpen: boolean;
    mode: 'create' | 'edit';
    task?: Task | null;
    onClose: () => void;
    users: User[];
    projects: Project[];
    onSuccess: () => void;
}

export const TaskModalWindow = ({
    isOpen,
    mode,
    task,
    onClose,
    users,
    projects,
    onSuccess
}: TaskModalWindowProps) => {
    const [form] = Form.useForm();
    const { createTask } = useCreateTask();
    const { editTask } = useEditTask();

    const initialValues = task ? {
        title: task.title,
        projectId: task.projectId.toString(),
        description: task.description || '',
        assigneeId: task.assigneeId.toString(),
    } : {};

    useEffect(() => {
        form.setFieldsValue(initialValues);
    }, [initialValues, form]);

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            let result;

            if (mode === 'create') {
                result = await createTask(values as any);
            } else if (mode === 'edit') {
                result = await editTask({...values, id: task?.id});
            }

            if (result) {
                form.resetFields();
                onSuccess();
                onClose();
            }
        } catch (validationError) {
            console.error('Validation error:', validationError);
        }
    };

    return (
        <Modal
            title={`${mode=== 'create' ? 'Создание новой задачи' : 'Редактирование текущей задачи'}`}
            open={isOpen}
            onCancel={onClose}
            footer={[
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
            >
                <Form.Item
                    name="title"
                    label="Название задачи"
                    rules={[{
                        required: true,
                        message: 'Введите название задачи'
                    }]}>
                    <Input
                        placeholder="Введите название задачи"
                    />
                </Form.Item>

                <Form.Item
                    name="projectId"
                    label="Проект" rules={[{
                        required: true,
                    message: 'Выберите проект'
                    }]}
                >
                    <Select
                        placeholder="Выберите проект"
                    >
                        {projects.map(project => (
                            <Select.Option
                                key={project.id}
                                value={project.id}
                            >
                                {project.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="description"
                    label="Описание">
                    <Input.TextArea
                        placeholder="Опишите задачу"
                        rows={4} />
                </Form.Item>

                <Form.Item
                    name="assigneeId"
                    label="Исполнитель"
                    rules={[{
                        required: true,
                        message: 'Выберите исполнителя'
                    }]}
                >
                    <Select
                        placeholder="Выберите исполнителя"
                    >
                        {users.map(user => (
                            <Select.Option
                                key={user.id}
                                value={user.id}
                            >
                                {user.name}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};