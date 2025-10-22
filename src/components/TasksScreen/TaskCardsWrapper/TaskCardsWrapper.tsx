import styles from './TaskCardsWrapper.module.css';
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { CreateTaskButton } from '@/components/TasksScreen/TaskCardsWrapper/CreateTaskButton/CreateTaskButton';
import { TaskModalWindow } from '@/components/TasksScreen/TaskCardsWrapper/TaskModalWindow/TaskModalWindow';
import { TaskCard } from '@/components/TasksScreen/TaskCardsWrapper/TaskCard/TaskCard';
import { useTasks } from '@/hooks/useTasks';
import { useUsers } from '@/hooks/useUsers';
import { useProjects } from '@/hooks/useProjects';
import { TaskPage } from '@/components/TasksScreen/TaskCardsWrapper/TaskPage/TaskPage';
import { Empty, Skeleton } from 'antd';
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
    const [isLoading, setIsLoading] = useState(true);

    const hasFetchedRef = useRef(false);

    const { projects, getProjects } = useProjects();
    const { tasks, getTasks } = useTasks();
    const { users, getUsers } = useUsers();
    const { createTask } = useCreateTask();

    useEffect(() => {
        if (hasFetchedRef.current) {
            return;
        }
        hasFetchedRef.current = true;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                await Promise.all([
                    getProjects(),
                    getTasks(),
                    getUsers()
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

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

    const visibleTask = useMemo(() => tasks.find((task) => task.id === selectedTask), [tasks, selectedTask]);

    // Skeleton для TaskCard
    const renderTaskCardSkeleton = () => (
        <div className={styles.taskCards}>
            <div className={styles.taskCardSkeleton}>
                <Skeleton active paragraph={{ rows: 3 }} />
            </div>
        </div>
    );

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
                        {isLoading ? (
                            // Показываем скелетоны во время загрузки
                            <>
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <React.Fragment key={index}>
                                        {renderTaskCardSkeleton()}
                                    </React.Fragment>
                                ))}
                            </>
                        ) : (
                            // Показываем реальные задачи после загрузки
                            tasks.map((task) => {
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
                            })
                        )}
                    </div>

                </div>

                <div className={styles.taskPage}>
                    {isLoading ? (
                        // Skeleton для TaskPage во время загрузки
                        <div className={styles.taskPageInfo}>
                            <Skeleton active paragraph={{ rows: 8 }} />
                        </div>
                    ) : visibleTask?.title ? (
                        <div className={styles.taskPageInfo}>
                            <TaskPage
                                getTasks={getTasks}
                                selectedTask={visibleTask}
                                projects={projects}
                                users={users}
                            />
                        </div>
                    ) : (
                        <div className={styles.taskPageNoData}>
                            <Empty />
                        </div>
                    )}
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