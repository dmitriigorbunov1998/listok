import styles from './TaskCardsWrapper.module.css';
import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { CreateTaskButton } from '@/components/TasksScreen/TaskCardsWrapper/CreateTaskButton/CreateTaskButton';
import { TaskModalWindow } from '@/components/TasksScreen/TaskCardsWrapper/TaskModalWindow/TaskModalWindow';
import { TaskCard } from '@/components/TasksScreen/TaskCardsWrapper/TaskCard/TaskCard';
import { useTasks } from '@/hooks/useTasks';
import { useUsers } from '@/hooks/useUsers';
import { useProjects } from '@/hooks/useProjects';
import { TaskPage } from '@/components/TasksScreen/TaskCardsWrapper/TaskPage/TaskPage';
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

    const onTaskSelectRef = useRef(onTaskSelect);
    onTaskSelectRef.current = onTaskSelect;

    const { projects, loading: projectsLoading, error: projectsError, getProjects } = useProjects();
    const { tasks, loading: tasksLoading, error: tasksError, getTasks } = useTasks();
    const { users, loading: usersLoading, error: usersError, getUsers } = useUsers();
    const { createTask } = useCreateTask();

    const projectsMap = useMemo(() => {
        const map = new Map<number, typeof projects[0]>();
        projects.forEach(project => map.set(project.id, project));
        return map;
    }, [projects]);

    const usersMap = useMemo(() => {
        const map = new Map<number, typeof users[0]>();
        users.forEach(user => map.set(user.id, user));
        return map;
    }, [users]);

    useEffect(() => {
        if (hasFetchedRef.current) return;
        hasFetchedRef.current = true;

        getProjects();
        getTasks();
        getUsers();
    }, []);

    useEffect(() => {
        if (initialTaskId) {
            const selectedTaskId = Number(initialTaskId.split('-')[1]);
            setSelectedTask(selectedTaskId);
        }
    }, [initialTaskId]);

    const showModal = useCallback(() => setIsModalVisible(true), []);
    const handleClose = useCallback(() => setIsModalVisible(false), []);

    const onCardClick = useCallback((id: number, projectId: number) => {
        const selectedTaskProject = projectsMap.get(projectId);
        setSelectedTask(id);
        onTaskSelectRef.current(`${selectedTaskProject?.shortName}-${id}`);
    }, [projectsMap]);

    const handleCreateTask = useCallback(async (values: any) => {
        try {
            const success = await createTask(values);

            if (success) {
                handleClose();
                getTasks();
            }
        } catch (error) {
            console.error('Ошибка при создании задачи:', error);
        }
    }, [createTask, handleClose, getTasks]);

    const visibleTask = useMemo(
        () => tasks.find((task) => task.id === selectedTask),
        [tasks, selectedTask]);

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
                            const project = projectsMap.get(task.projectId);
                            const user = usersMap.get(task.assigneeId);

                            return (
                                <div
                                    className={styles.taskCards}
                                    key={`${task.title}-${task.id}`}
                                >
                                    <TaskCard
                                        task={task}
                                        project={project}
                                        user={user}
                                        onCardClick={onCardClick}
                                    />
                                </div>
                            );
                        })}
                    </div>

                </div>

                <div className={styles.taskPage}>
                    {
                        visibleTask?.title ? (
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