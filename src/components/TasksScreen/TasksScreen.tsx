'use client';

import { VerticalMenu } from '@/components/TasksScreen/VerticalMenu/VerticalMenu';
import { TaskCardsWrapper } from '@/components/TasksScreen/TaskCardsWrapper/TaskCardsWrapper';
import styles from './TasksScreen.module.css';
import { useRouter } from 'next/navigation';

interface ContentProps {
    initialTaskId?: string;
}

export const TasksScreen = ({ initialTaskId }: ContentProps ) => {
    const router = useRouter();

    return (
        <div className={styles.content}>
            <VerticalMenu />
            <TaskCardsWrapper
                initialTaskId={initialTaskId}
                onTaskSelect={(taskId) => router.push(`/task/${taskId}`)}
            />
        </div>
    );
};