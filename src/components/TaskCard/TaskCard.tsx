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
}

export const TaskCard = ({ task, project, user }: TaskCardProps) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardContainer}>
                <div className={styles.rowStatus}>
                    <div className={styles.taskId}>{project?.shortName}-{task.id}</div>
                    <TaskCardStatus status={task.status} />
                </div>
                <div className={styles.title}>
                    {task.title}
                </div>
                <div className={styles.rowAssigner}>
                    <Avatar size="small" src={user?.avatar}>
                        {user?.name?.[0]?.toUpperCase() || 'A'}
                    </Avatar>
                    <div className={styles.assigner}>{user?.name}</div>
                </div>
                <div className={styles.data}>
                    <div className={styles.rowProjectName}>
                        <div className={styles.rowProjectNameText}>
                            <EnvironmentOutlined />
                            <div className={styles.projectName}>{project?.name}</div>
                        </div>
                    </div>
                    <div className={styles.rowDate}>
                        <div className={styles.rowDateText}>
                            <ClockCircleOutlined />
                            <div className={styles.date}>
                                {new Date(task.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};