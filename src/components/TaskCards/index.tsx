import data from './taskCardsData.json';
import styles from './TaskCards.module.css';
import { Status } from '@/src/components/Status';
import { Avatar } from "antd";
import {ClockCircleOutlined, EnvironmentOutlined } from "@ant-design/icons";

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

const taskData: TasksData = data;

export const TaskCards = () => {
    return (
        <div className={styles.container}>
            {taskData.tasks.map((task, index) => (
                <div key={task.taskId} className={styles.card}>
                    <div className={styles.cardContainer}>
                        <div className={styles.rowTask}>
                            <div className={styles.taskId}>{task.taskId}</div>
                            <Status status={task.status} />
                        </div>
                        <div className={styles.title}>{task.title}</div>
                        <div className={styles.rowAssigner}>
                            <Avatar size="small">A</Avatar>
                            <div className={styles.assigner}>{task.assigner}</div>
                        </div>
                        <div className={styles.rowLocation}>
                            <EnvironmentOutlined className={styles.iconLocation}></EnvironmentOutlined>
                            <div className={styles.location}>FominClinic</div>
                        </div>
                        <div className={styles.rowDate}>
                            <ClockCircleOutlined className={styles.clock}></ClockCircleOutlined>
                            <div className={styles.date}>{task.createAt}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};