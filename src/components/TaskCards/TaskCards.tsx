'use client';

import styles from './TaskCards.module.css';
import { useTasks } from '@/hooks/useTasks';
import { useTaskForm } from '@/hooks/useTaskForm';
import { TaskCard } from '@/components/TaskCard/TaskCard';
import { AddTaskButton } from '@/components/AddTaskButton/AddTaskButton';
import { TaskForm } from '@/components/TaskForm/TaskForm';
import { TaskCardsProps } from '@/types/types';

export const TaskCards = ({ users }: TaskCardsProps) => {
    const { tasks, projects, loading, error, fetchTasks, addTask } = useTasks();
    const { isModalVisible, form, showModal, handleCancel, handleOk } = useTaskForm(addTask);

    if (loading) {
        return <div className={styles.container}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }

    return (
        <div className={styles.wrapper}>
            <AddTaskButton onClick={showModal} />

            <div className={styles.container}>
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        users={users}
                        projects={projects}
                    />
                ))}
            </div>

            <TaskForm
                visible={isModalVisible}
                form={form}
                users={users}
                projects={projects}
                onCancel={handleCancel}
                onOk={handleOk}
            />
        </div>
    );
};