import { TaskCards } from '@/src/components/TaskCards/TaskCards';
import { Menu } from '@/src/components/Menu/Menu';
import styles from './Content.module.css';
import { useCallback, useEffect, useState } from 'react';
import axios from "axios";

export const Content = () => {
    const [users, setUsers] = useState<any>([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = useCallback(async () => {
        try {
            const usersResponse = await axios.get('/api/users');

            setUsers(usersResponse.data);
        } catch (error) {
            console.error(error);
        }
    }, [])

    return (
        <div className={styles.content}>
            <Menu />
            <TaskCards users={users} />
        </div>
    )
}