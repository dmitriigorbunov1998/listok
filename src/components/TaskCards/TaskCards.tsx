'use client';

import styles from './TaskCards.module.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CreateTaskButton } from "@/components/CreateTaskButton/CreateTaskButton";
import { TaskModalWindow } from "@/components/TaskModalWindow/TaskModalWindow";
import { TaskCardStatus } from '@/components/TaskCardsStatus/TaskCardsStatus';
import { Avatar } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useTasks } from '@/hooks/useTasks';
import { useUsers } from '@/hooks/useUsers';
import { useProjects } from '@/hooks/useProjects';

export const TaskCards = ({ users: initialUsers }: TaskCardsProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const hasFetchedRef = useRef(false);

    // Используем все необходимые хуки
    const { projects, loading: projectsLoading, error: projectsError, getProjects } = useProjects();
    const { tasks, loading: tasksLoading, error: tasksError, getTasks } = useTasks();
    const { users: usersData, loading: usersLoading, error: usersError, getUsers } = useUsers();

    // useEffect для загрузки данных
    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        console.log('Загрузка данных...');
        getProjects();
        getTasks();
        getUsers();
    }, [getProjects, getTasks, getUsers]);

    // Используем пользователей из пропсов или из хука
    const users = initialUsers || usersData;

    const showModal = useCallback(() => setIsModalVisible(true), []);
    const handleClose = useCallback(() => setIsModalVisible(false), []);

    const handleCreateTask = useCallback(async (taskData: any) => {
        try {
            console.log('Создание задачи:', taskData);
            await Promise.all([getTasks(), getProjects()]);
            handleClose();
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
        }
    }, [getTasks, getProjects, handleClose]);

    // Проверяем загрузку всех данных
    const isLoading = projectsLoading || tasksLoading || usersLoading;
    const hasError = projectsError || tasksError || usersError;

    if (isLoading) return <div className={styles.loading}>Загрузка...</div>;
    if (hasError) return <div className={styles.error}>Ошибка загрузки</div>;

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
            <div className={styles.container}>
                {tasks.map((task) => {
                    const project = projects.find(project => project.id === task.project_id);
                    const user = users.find(user => user.id === task.assignee_id);

                    return (
                        <div key={task.id} className={styles.card}>
                            <div className={styles.cardContainer}>
                                <div className={styles.rowStatus}>
                                    <div className={styles.taskId}>{task.id}</div>
                                    <TaskCardStatus status={task.status} />
                                </div>
                                <div className={styles.title}>
                                    {project?.short_name || project?.name || 'Неизвестный проект'}
                                </div>
                                <div className={styles.description}>
                                    {task.description || task.title || 'Без описания'}
                                </div>
                                <div className={styles.rowAssigner}>
                                    <Avatar size="small" src={user?.avatar}>
                                        {user?.name?.[0]?.toUpperCase() || 'A'}
                                    </Avatar>
                                    <div className={styles.assigner}>{user?.name || 'Не назначен'}</div>
                                </div>
                                <div className={styles.data}>
                                    <div className={styles.rowLocation}>
                                        <EnvironmentOutlined />
                                        <div className={styles.location}>{task.location || 'FominClinic'}</div>
                                    </div>
                                    <div className={styles.rowDate}>
                                        <ClockCircleOutlined />
                                        <div className={styles.date}>
                                            {task.created_at ? new Date(task.created_at).toLocaleDateString() : 'Дата не указана'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};