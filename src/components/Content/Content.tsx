import { VerticalMenu } from '@/components/VerticalMenu/VerticalMenu';
import { TaskCards } from '@/components/TaskCards/TaskCards';
import styles from './Content.module.css';

export const Content = () => {
    return (
        <div className={styles.content}>
            <VerticalMenu />
            <TaskCards />
        </div>
    );
};