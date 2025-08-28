import styles from '@/components/TaskCardsWrapper/TaskCardsWrapper.module.css';
import { TaskCardStatus } from '@/components/TaskCardsStatus/TaskCardsStatus';
import { Avatar } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import React from 'react';
import { Project, Task, User } from '@/types';

export interface TaskCardsProps {
    users: User[];
    tasks: Task[];
    projects: Project[];
    theme: string;
}

export const TaskCards = ({ tasks, projects, users }: TaskCardsProps) => {
    return (
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
    )
}