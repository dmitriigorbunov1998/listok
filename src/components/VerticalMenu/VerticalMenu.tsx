'use client';

import React, { useState } from 'react';
import styles from './VerticalMenu.module.css';
import { CreateTaskButton } from "@/components/CreateTaskButton/CreateTaskButton";
import { TaskModalWindow } from "@/components/TaskModalWindow/TaskModalWindow";
import { useUsers } from '@/hooks/useUsers';

export const VerticalMenu = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { users, loading, error } = useUsers();

    const showModal = () => setIsModalVisible(true);
    const handleClose = () => setIsModalVisible(false);

    const handleCreateTask = async (taskData: any) => {
        try {
            console.log('Создание задачи:', taskData);
            handleClose();
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
        }
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.data}>
                <CreateTaskButton onClick={showModal} />
                <TaskModalWindow
                    isVisible={isModalVisible}
                    onClose={handleClose}
                    onCreate={handleCreateTask}
                    users={users}
                />
            </div>
        </div>
    );
};