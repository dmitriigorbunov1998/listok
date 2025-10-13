import { Modal, Form, Input, Select, Button } from 'antd';
import { Project, User } from '@/types';

interface TaskModalWindowProps {
    isVisible: boolean;
    onClose: () => void;
    users: User[];
    projects: Project[];
    onSubmit: (values: any) => Promise<void>;
    type: string;
    description?: string;
    taskTitle?: string;
    assigneeId?: number;
    projectId?: number;
}

export const TaskModalWindow = ({
    isVisible,
    onClose,
    users,
    projects,
    onSubmit,
    type,
    description,
    taskTitle,
    assigneeId,
    projectId,
}: TaskModalWindowProps) => {
    const [form] = Form.useForm();

    const title = type === 'create' ? 'Создание задачи' : 'Редактирование задачи';

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            onSubmit(values);
            form.resetFields();
            onClose();
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
                        {type === 'edit' ? 'Сохранить' : 'Создать'}
                    </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    description: description,
                    title: taskTitle,
                    assigneeId: assigneeId,
                    projectId: projectId,
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