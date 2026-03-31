import styles from './TaskCard.module.css';
import { TaskCardStatus } from '@/components/TasksScreen/TaskCardsWrapper/TaskCard/TaskCardStatus/TaskCardStatus';
import { Avatar } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import React, { useCallback, useMemo } from 'react';
import { Project, Task, User } from '@/types';

export interface TaskCardProps {
    task: Task;
    project?: Project;
    user?: User;
    onCardClick: (id: number, projectId: number) => void;
}

export const TaskCard = React.memo((
    {
        task,
        project,
        user,
        onCardClick,
    }: TaskCardProps) => {

    const handleClick = useCallback(() => {
        onCardClick(task.id, task.projectId);
    }, [onCardClick, task.id, task.projectId]);

    const formattedDate = useMemo(
        () => new Date(task.createdAt).toLocaleDateString(),
        [task.createdAt],
    );

    return (
        <div className={styles.card} onClick={handleClick}>
            <div className={styles.cardContainer}>
                <div className={styles.rowStatus}>
                    <div className={styles.taskId}>{project?.shortName}-{task.id}</div>
                    <TaskCardStatus status={task.status} />
                </div>
                <div className={styles.title} title={task.title}>
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
                                {formattedDate}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});