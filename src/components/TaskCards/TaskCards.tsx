'use client';

import styles from './TaskCards.module.css';
import { Status } from '@/src/components/Status/Status';
import { Avatar } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

interface Task {
    users: any[];
    projects: any[];
}

export const TaskCards = ({ users }: Task) => {
    const [tasks, setTasks] = useState<any[]>([]);
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const formatDate = useCallback((dateString: string): string => {
        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString; // возвращаем исходную строку если дата невалидна
            }

            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear().toString().slice(-2);

            return `${day}.${month}.${year}`;
        } catch {
            return dateString;
        }
    }, []);

    const getUserName = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [responseUsers, responseProjects] = await Promise.all([
                axios.get('api/tasks'),
                axios.get('api/projects')
            ]);

            setTasks(responseUsers.data);
            setProjects(responseProjects.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    }, []);

    const getProjectTitle = useCallback((projectId: number) => {
        const project = projects.find((project: any) => project.id === projectId);
        return project?.short_name || 'Unknown Project';
    }, [projects]);

    const getAssigneeName = useCallback((assigneeId: number) => {
        try {
            const user = users.find((user: any) => user.id === assigneeId);
            return user?.name || 'Unknown User';
        } catch {
            return 'Unknown User';
        }
    }, [users]);

    useEffect(() => {
        getUserName();
    }, [getUserName]);

    if (loading) {
        return <div className={styles.container}>Loading...</div>;
    }

    if (error) {
        return <div className={styles.container}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            {tasks?.map((task: any) => (
                <div key={task.id} className={styles.card}>
                    <div className={styles.cardContainer}>
                        <div className={styles.rowStatus}>
                            <div className={styles.taskId}>{task.id}</div>
                            <Status status={task.status} />
                        </div>
                        <div className={styles.title}>{getProjectTitle(task.project_id)}</div>
                        <div className={styles.rowAssigner}>
                            <Avatar size="small">A</Avatar>
                            <div className={styles.assigner}>{getAssigneeName(task.assignee_id)}</div>
                        </div>
                        <div className={styles.data}>
                            <div className={styles.rowLocation}>
                                <div className={styles.rowLocationText}>
                                    <EnvironmentOutlined />
                                    <div className={styles.location}>FominClinic</div>
                                </div>
                            </div>
                            <div className={styles.rowDate}>
                                <div className={styles.rowDateText}>
                                    <ClockCircleOutlined />
                                    <div className={styles.date}>{formatDate(task.created_at)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};