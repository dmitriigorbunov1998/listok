"use client"

import { VerticalMenu } from '@/components/VerticalMenu/VerticalMenu';
import { TaskCardsWrapper } from '@/components/TaskCardsWrapper/TaskCardsWrapper';
import styles from './Content.module.css';
import { useRouter } from 'next/navigation';

interface ContentProps {
    initialTaskId?: string;
}

export const Content = ({ initialTaskId }: ContentProps ) => {
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