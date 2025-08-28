import styles from './TaskCard.module.css';
import { TaskCardStatus } from '@/components/TaskCardStatus/TaskCardStatus';
import { Avatar } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import React from 'react';
import { Project, Task, User } from '@/types';

export interface TaskCardProps {
    task: Task;
    project?: Project;
    user?: User;
    theme: string;
}

export const TaskCard = ({ task, project, user }: TaskCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardContainer}>
                <div className={styles.rowStatus}>
                    <div className={styles.taskId}>{project?.short_name || project?.name || 'Неизвестный проект'}-{task.id}</div>
                    <TaskCardStatus status={task.status} />
                </div>
                <div className={styles.title}>
                    {task.title || 'Без описания'}
                </div>
                <div className={styles.rowAssigner}>
                    <Avatar size="small" src={user?.avatar}>
                        {user?.name?.[0]?.toUpperCase() || 'A'}
                    </Avatar>
                    <div className={styles.assigner}>{user?.name || 'Не назначен'}</div>
                </div>
                <div className={styles.data}>
                    <div className={styles.rowLocation}>
                        <div className={styles.rowLocationText}>
                            <EnvironmentOutlined />
                            <div className={styles.location}>{task.location || 'FominClinic'}</div>
                        </div>
                    </div>
                    <div className={styles.rowDate}>
                        <div className={styles.rowDateText}>
                            <ClockCircleOutlined />
                            <div className={styles.date}>
                                {task.created_at ? new Date(task.created_at).toLocaleDateString() : 'Дата не указана'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};