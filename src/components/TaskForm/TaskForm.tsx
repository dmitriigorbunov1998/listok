import { Modal, Form, Input, Select } from 'antd';
import { User, Project } from '@/types/types';

const { Option } = Select;
const { TextArea } = Input;

interface TaskFormProps {
    visible: boolean;
    form: any;
    users: User[];
    projects: Project[];
    onCancel: () => void;
    onOk: () => void;
}

export const TaskForm = ({
                             visible,
                             form,
                             users,
                             projects,
                             onCancel,
                             onOk
                         }: TaskFormProps) => {
    return (
        <Modal
            title="Создание новой задачи"
            open={visible}
            onOk={onOk}
            onCancel={onCancel}
            okText="Создать"
            cancelText="Отмена"
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    status: 'pending',
                    project_id: projects[0]?.id,
                    assignee_id: users[0]?.id
                }}
            >
                <Form.Item
                    label="Название задачи"
                    name="title"
                    rules={[{ required: true, message: 'Введите название задачи' }]}
                >
                    <Input placeholder="Введите название задачи" />
                </Form.Item>

                <Form.Item
                    label="Описание"
                    name="description"
                >
                    <TextArea
                        rows={4}
                        placeholder="Введите описание задачи"
                    />
                </Form.Item>

                <Form.Item
                    label="Статус"
                    name="status"
                    rules={[{ required: true, message: 'Выберите статус' }]}
                >
                    <Select>
                        <Option value="pending">В ожидании</Option>
                        <Option value="in_progress">В работе</Option>
                        <Option value="completed">Завершено</Option>
                        <Option value="cancelled">Отменено</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Проект"
                    name="project_id"
                    rules={[{ required: true, message: 'Выберите проект' }]}
                >
                    <Select>
                        {projects.map(project => (
                            <Option key={project.id} value={project.id}>
                                {project.short_name} - {project.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label="Исполнитель"
                    name="assignee_id"
                    rules={[{ required: true, message: 'Выберите исполнителя' }]}
                >
                    <Select>
                        {users.map(user => (
                            <Option key={user.id} value={user.id}>
                                {user.name} ({user.email})
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
};