import { VerticalMenu } from '@/components/VerticalMenu/VerticalMenu';
import { TaskCards } from '@/components/TaskCards/TaskCards';
import styles from './Content.module.css';
import { useUsers } from '@/hooks/useUsers';

export const Content = () => {
    const { users, loading, error } = useUsers();

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>Ошибка: {error}</div>;

    return (
        <div className={styles.content}>
            <VerticalMenu />
            <TaskCards users={users} />
        </div>
    );
};