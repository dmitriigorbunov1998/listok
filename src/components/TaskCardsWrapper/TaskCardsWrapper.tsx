'use client';

import styles from './TaskCardsWrapper.module.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CreateTaskButton } from '@/components/CreateTaskButton/CreateTaskButton';
import { TaskModalWindow } from '@/components/TaskModalWindow/TaskModalWindow';
import { TaskCard } from '@/components/TaskCard/TaskCard';
import { useTasks } from '@/hooks/useTasks';
import { useUsers } from '@/hooks/useUsers';
import { useProjects } from '@/hooks/useProjects';

export const TaskCardsWrapper = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const hasFetchedRef = useRef(false);

    const { projects, loading: projectsLoading, error: projectsError, getProjects } = useProjects();
    const { tasks, loading: tasksLoading, error: tasksError, getTasks } = useTasks();
    const { users, loading: usersLoading, error: usersError, getUsers } = useUsers();

    useEffect(() => {
        if (hasFetchedRef.current) {
            return;
        }
        hasFetchedRef.current = true;

        getProjects();
        getTasks();
        getUsers();
    }, []);

    const showModal = useCallback(() => setIsModalVisible(true), []);
    const handleClose = useCallback(() => setIsModalVisible(false), []);

    const handleCreateTask = useCallback(async () => {
        try {
            handleClose();
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
        }
    }, [handleClose]);

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
            <TaskModalWindow isVisible={isModalVisible} onClose={handleClose} onCreate={handleCreateTask} users={users} projects={projects} />
            <div className={styles.container}>
                {tasks.map((task) => {
                    const project = projects.find(project => project.id === task.projectId);
                    const user = users.find(user => user.id === task.assigneeId);

                    return (
                        <TaskCard key={task.id} task={task} project={project} user={user} />
                    );
                })}
            </div>
        </div>
    );
};