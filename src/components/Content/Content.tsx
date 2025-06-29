import { TaskCards } from '@/src/components/TaskCards/TaskCards';
import { Menu } from '@/src/components/Menu/Menu';
import styles from './Content.module.css';

export const Content = () => {
    return (
        <div className={styles.content}>
            <Menu />
            <TaskCards />
        </div>
    )
}