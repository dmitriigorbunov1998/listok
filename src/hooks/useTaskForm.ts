import { useState } from "react";
import { Form, message } from "antd";
import { Task } from "@/types/types";

export const useTaskForm = (onAddTask: (task: Task) => void) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            const newTask: Task = {
                id: Date.now(), // Временный ID
                title: values.title,
                description: values.description,
                status: values.status,
                project_id: values.project_id,
                assignee_id: values.assignee_id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            };

            onAddTask(newTask);
            message.success('Задача успешно создана!');
            setIsModalVisible(false);
            form.resetFields();

        } catch (error) {
            console.error('Error creating task:', error);
            message.error('Ошибка при создании задачи');
        }
    };

    return {
        isModalVisible,
        form,
        showModal,
        handleCancel,
        handleOk
    };
};