'use client';

import styles from './TaskCardsWrapper.module.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CreateTaskButton } from "@/components/CreateTaskButton/CreateTaskButton";
import { TaskModalWindow } from "@/components/TaskModalWindow/TaskModalWindow";
import { useTasks } from '@/hooks/useTasks';
import { useUsers } from '@/hooks/useUsers';
import { useProjects } from '@/hooks/useProjects';
import { TaskCards } from "@/components/TaskCards/TaskCards";

export const TaskCardsWrapper = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const hasFetchedRef = useRef(false);

    // Используем все необходимые хуки
    const { projects, loading: projectsLoading, error: projectsError, getProjects } = useProjects();
    const { tasks, loading: tasksLoading, error: tasksError, getTasks } = useTasks();
    const { users, loading: usersLoading, error: usersError, getUsers } = useUsers();

    // useEffect для загрузки данных
    useEffect(() => {
        if (hasFetchedRef.current) {
            return;
        }
        hasFetchedRef.current = true;

        getProjects();
        getTasks();
        getUsers();
    }, []);

    // Используем пользователей из пропсов или из хука
    const showModal = useCallback(() => setIsModalVisible(true), []);
    const handleClose = useCallback(() => setIsModalVisible(false), []);

    const handleCreateTask = useCallback(async (taskData: any) => {
        try {
            handleClose();
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
        }
    }, [handleClose]);

    // Проверяем загрузку всех данных
    const isLoading = projectsLoading || tasksLoading || usersLoading;
    const hasError = projectsError || tasksError || usersError;

    if (isLoading) {
        return <div className={styles.loading}>Загрузка...</div>;
    }

    if (hasError) {
        return <div className={styles.error}>Ошибка загрузки</div>;
    }

    return (
        <div className={styles.wrapper}>
            <CreateTaskButton onClick={showModal} />
            <TaskModalWindow
                isVisible={isModalVisible}
                onClose={handleClose}
                onCreate={handleCreateTask}
                users={users}
                projects={projects}
            />
            <TaskCards
                tasks={tasks}
                projects={projects}
                users={users}
            />
        </div>
    );
};