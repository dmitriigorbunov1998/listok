import styles from './TaskCardsWrapper.module.css';
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { CreateTaskButton } from '@/components/Content/TaskCardsWrapper/CreateTaskButton/CreateTaskButton';
import { TaskModalWindow } from '@/components/Content/TaskCardsWrapper/TaskModalWindow/TaskModalWindow';
import { TaskCard } from '@/components/Content/TaskCardsWrapper/TaskCard/TaskCard';
import { useTasks } from '@/hooks/useTasks';
import { useUsers } from '@/hooks/useUsers';
import { useProjects } from '@/hooks/useProjects';
import { TaskPage } from '@/components/Content/TaskCardsWrapper/TaskPage/TaskPage';
import { Empty } from 'antd';
import { useCreateTask } from '@/hooks/useCreateTask';

interface TaskCardsWrapperProps {
    initialTaskId?: string;
    onTaskSelect: (taskId: string) => void;
}

export const TaskCardsWrapper = ({
     initialTaskId,
     onTaskSelect
}: TaskCardsWrapperProps) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState<number | null>(null);

    const hasFetchedRef = useRef(false);

    const { projects, loading: projectsLoading, error: projectsError, getProjects } = useProjects();
    const { tasks, loading: tasksLoading, error: tasksError, getTasks } = useTasks();
    const { users, loading: usersLoading, error: usersError, getUsers } = useUsers();
    const { createTask } = useCreateTask();

    useEffect(() => {
        if (hasFetchedRef.current) {
            return;
        }
        hasFetchedRef.current = true;

        getProjects();
        getTasks();
        getUsers();

        if (initialTaskId) {
            const selectedTaskId = Number(initialTaskId.split('-')[1]);

            setSelectedTask(selectedTaskId);
        }
    }, []);

    const showModal = useCallback(() => setIsModalVisible(true), []);

    const onCardClick = useCallback((id: number, projectId: number) => {
        const selectedTaskProject = projects.find((project) => project.id === projectId);
        setSelectedTask(id);
        onTaskSelect(`${selectedTaskProject?.shortName}-${id}`);
    }, [projects]);

    const handleClose = useCallback(() => setIsModalVisible(false), []);

    const handleCreateTask = useCallback(async (values: any) => {
        try {
            const success = await createTask(values);

            if (success) {
                handleClose();
            }
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
        }
    }, [handleClose]);

    const visibleTask = useMemo(() => tasks.find((task) => task.id === selectedTask), [tasks, selectedTask, tasksLoading]);

    return (
        <div className={styles.taskContent}>
            <div className={styles.taskInfo}>
                <div className={styles.taskWrapper}>

                    <div className={styles.createTaskButton}>
                        <CreateTaskButton
                            onClick={showModal}
                        />
                    </div>

                    <div className={styles.taskCardsWrapper}>
                        {tasks.map((task) => {
                            const project = projects.find(project => project.id === task.projectId);
                            const user = users.find(user => user.id === task.assigneeId);

                            return (
                                <div
                                    className={styles.taskCards}
                                    key={`${task.title}-${task.id}`}
                                >
                                    <TaskCard
                                        task={task}
                                        project={project}
                                        user={user}
                                        onClick={(() => onCardClick(task.id, task.projectId))}
                                    />
                                </div>
                            );
                        })}
                    </div>

                </div>

                <div className={styles.taskPage}>
                    {visibleTask ? (
                        visibleTask?.title ? (
                            <TaskPage
                                getTasks={getTasks}
                                selectedTask={visibleTask}
                                projects={projects}
                                users={users}
                            />
                        ) : (
                            <Empty />
                        )
                    ) : null}
                </div>
            </div>

            <TaskModalWindow
                isVisible={isModalVisible}
                onClose={handleClose}
                onSubmit={handleCreateTask}
                users={users}
                projects={projects}
                type='create'
            />

        </div>
    );
};