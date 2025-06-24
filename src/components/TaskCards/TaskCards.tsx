'use client';

import data from './taskCardsData.json';
import styles from './TaskCards.module.css';
import { Status } from '@/src/components/Status/Status';
import { Avatar } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import axios from 'axios';

interface Task {
    taskId: string;
    title: string;
    status: 'done' | 'review' | 'inProgress' | 'todo';
    createAt: string;
    assigner: string;
    projectId: string;
}

interface TasksData {
    tasks: Task[];
}

interface TasksProps {
    projectId: string;
}

const TasksPage = ({ projectId }: TasksProps) => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(
                    `https://tasky.ru/api/tasks/?projectId=${projectId}`
                );
                setTasks(response.data.tasks);
            } catch (error) {
                console.error('Ошибка:', error);
            }
        };

        fetchTasks();
    }, [projectId]);
};

const normalizeStatuses = (rawData: any): TasksData => ({
    ...rawData,
    tasks: rawData.tasks.map((task: Task) => ({
        ...task,
        status: ["done", "inProgress", "review", "todo"].includes(task.status) ? task.status : "unknown"
    }))
});

const taskData: TasksData = normalizeStatuses(data);

export const TaskCards = () => {
    return (
        <div className={styles.container}>
            {taskData.tasks.map((task) => (
                <div key={task.taskId} className={styles.card}>
                    <div className={styles.cardContainer}>
                        <div className={styles.rowStatus}>
                            <div className={styles.taskId}>{task.taskId}</div>
                            <Status status={task.status} />
                        </div>
                        <div className={styles.title}>{task.title}</div>
                        <div className={styles.rowAssigner}>
                            <Avatar size="small">A</Avatar>
                            <div className={styles.assigner}>{task.assigner}</div>
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
                                    <div className={styles.date}>{task.createAt}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};