'use client';

import styles from './TaskCards.module.css';
import { Status } from '@/components/Status/Status';
import { Avatar } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

interface Task {
    users: any[];
    projects: any[];
}

export const TaskCards = ({ users }: Task) => {
    const [tasks, setTasks] = useState<any>([]);
    const [projects, setProjects] = useState<any>([]);

    useEffect(() => {
        getUserName();
    }, []);

    const getUserName = useCallback(async () => {
        try {
            const responseUsers = await axios.get('api/tasks');
            const responseProjects = await axios.get('api/projects');

            setTasks(responseUsers.data);
            setProjects(responseProjects.data);
        } catch (error) {
            console.error(error);
        }
    }, []);

    // 1. Вынести short_name в title карточки c помощью find и useCallback getUserName
    // 2. Посмотреть ролик Минина на тему хуков (приоритет)
    // 3. Вынести users.find() и projects.find() в отдельный useCallback getUserName
    // 4. Разобраться с задваиванием запросом в network и console (Только в данном случае разрешается использовать ИИ)
    // 5. Добавить try/catch в запросы пользователей в content где users
    // 6. Перевести текущую дату в вид дд.мм.гггг. с помощью new Date()

    return (
        <div className={styles.container}>
            {tasks?.map((task:any) => (
                <div key={task.id} className={styles.card}>
                    <div className={styles.cardContainer}>
                        <div className={styles.rowStatus}>
                            <div className={styles.taskId}>{task.id}</div>
                            <Status status={task.status} />
                        </div>
                        <div className={styles.title}>{projects.find((project:any):boolean => project.id)?.short_name}</div>
                        <div className={styles.rowAssigner}>
                            <Avatar size="small">A</Avatar>
                            <div className={styles.assigner}>{users.find((user) => user.id === task.assignee_id)?.name}</div>
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
                                    <div className={styles.date}>{task.created_at}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};