import { VerticalMenu } from '@/components/VerticalMenu/VerticalMenu';
import { TaskCardsWrapper } from '@/components/TaskCardsWrapper/TaskCardsWrapper';
import styles from './Content.module.css';

export const Content = () => {
    return (
        <div className={styles.content}>
            <VerticalMenu />
            <TaskCardsWrapper />
        </div>
    );
};