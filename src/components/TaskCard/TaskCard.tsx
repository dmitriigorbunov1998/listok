import { Avatar } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { Status } from '@/components/Status/Status'; // Исправлено на @/components/
import { formatDate } from '@/utils/dateFormatter';
import { Task, User, Project } from '@/types/types';
import styles from './TaskCard.module.css';

interface TaskCardProps {
    task: Task;
    users: User[];
    projects: Project[];
}

export const TaskCard = ({ task, users, projects }: TaskCardProps) => {
    const getProjectTitle = (projectId: number) => {
        const project = projects.find(project => project.id === projectId);
        return project?.short_name || 'Unknown Project';
    };

    const getAssigneeName = (projectId: number) => {
        try {
            const user = users.find(user => user.id === assigneeId);
            return user?.name || 'Unknown User';
        } catch {
            return 'Unknown User';
        }
    };

    return (
        <div className={styles.card}>
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
    );
};