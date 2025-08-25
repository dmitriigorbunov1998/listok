'use client';

import styles from './TaskCards.module.css';
import { TaskCardStatus } from '@/components/TaskCardsStatus/TaskCardsStatus';
import { Avatar } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useTasks } from '@/hooks/useTasks';
import { TaskCardsProps } from '@/types';

export const TaskCards = ({ users }: TaskCardsProps) => {
    const { tasks, projects, loading, error } = useTasks();

    if (loading) return <div>Загрузка задач...</div>;
    if (error) return <div>Ошибка загрузки задач: {error}</div>;
    if (tasks.length === 0) return <div className={styles.empty}>Задачи не найдены</div>;
    if (projects.length === 0) return <div className={styles.empty}>Проекты не найдены</div>;

    return (
        <div className={styles.container}>
            {tasks.map((task) => {
                const project = projects.find(projects => projects.id === task.project_id);
                const user = users.find(users => users.id === task.assignee_id);

                return (
                    <div key={task.id} className={styles.card}>
                        <div className={styles.cardContainer}>
                            <div className={styles.rowStatus}>
                                <div className={styles.taskId}>{task.id}</div>
                                <TaskCardStatus status={task.status} />
                            </div>
                            <div className={styles.title}>{project?.short_name}</div>
                            <div className={styles.rowAssigner}>
                                <Avatar size="small">
                                    {user?.name?.[0]?.toUpperCase() || 'A'}
                                </Avatar>
                                <div className={styles.assigner}>{user?.name}</div>
                            </div>
                            <div className={styles.data}>
                                <div className={styles.rowLocation}>
                                    <EnvironmentOutlined />
                                    <div className={styles.location}>FominClinic</div>
                                </div>
                                <div className={styles.rowDate}>
                                    <ClockCircleOutlined />
                                    <div className={styles.date}>
                                        {new Date(task.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};