import { TaskCards } from '@/components/TaskCards/TaskCards';
import { VerticalMenu } from '@/components/VerticalMenu/VerticalMenu';
import styles from './Content.module.css';
import { useCallback, useEffect, useState } from 'react';
import axios from "axios";

// Интерфейс пользователя (User):
export interface User {
    id: number;
    name: string;
    email: string;
}

// Интерфейс пропсов компонента TaskCards:
export interface TaskCardsProps {
    users: User[]; // меняем props на users
}

// Основной компонент Content:
export const Content = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = useCallback(async () => {
        try {
            const response = await axios.get('/api/users');
            if (response.status === 200) {
                setUsers(response.data);
            } else {
                console.error("Ошибка при загрузке пользователей:", response.statusText);
            }
        } catch (error) {
            console.error("Ошибка при загрузке пользователей:", error);
        }
    }, []);

    return (
        <div className={styles.content}>
            <VerticalMenu />
            <TaskCards users={users} />
        </div>
    );
};