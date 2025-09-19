'use client';

import styles from './TaskCardsWrapper.module.css';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CreateTaskButton } from '@/components/TaskCardsWrapper/CreateTaskButton/CreateTaskButton';
import { TaskModalWindow } from '@/components/TaskCardsWrapper/TaskModalWindow/TaskModalWindow';
import { TaskCard } from '@/components/TaskCardsWrapper/TaskCard/TaskCard';
import { useTasks } from '@/hooks/useTasks';
import { useUsers } from '@/hooks/useUsers';
import { useProjects } from '@/hooks/useProjects';
import { TaskPage } from '@/components/TaskCardsWrapper/TaskPage/TaskPage';
import { Task } from '@/types';
import { Empty } from 'antd';

export const TaskCardsWrapper = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
    const onCardClick = useCallback((card: any) => {
        setSelectedTask(card);
    }, []);
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
        <div className={styles.taskContent}>
            <div className={styles.taskInfo}>
                <div className={styles.taskWrapper}>
                    <div className={styles.createTaskButton}>
                        <CreateTaskButton onClick={showModal} />
                    </div>
                    <div className={styles.taskCardsWrapper}>
                        {tasks.map((task) => {
                            const project = projects.find(project => project.id === task.projectId);
                            const user = users.find(user => user.id === task.assigneeId);

                            return (
                                <div className={styles.taskCards} key={`${task.title}-${task.id}`}>
                                    <TaskCard
                                        task={task}
                                        project={project}
                                        user={user}
                                        onClick={(() => onCardClick(task))}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.taskPage}>
                    {
                        selectedTask?.title ? 
                        <div className={styles.taskPageInfo}><TaskPage selectedTask={selectedTask} projects={projects} users={users} /></div> : 
                        <div className={styles.taskPageNoData}><Empty /></div>
                    }
                </div>
            </div>
            <TaskModalWindow isVisible={isModalVisible} onClose={handleClose} onCreate={handleCreateTask} users={users} projects={projects} />
        </div>
    );
};