'use client';

import { VerticalMenu } from '@/components/TasksScreen/VerticalMenu/VerticalMenu';
import { TaskCardsWrapper } from '@/components/TasksScreen/TaskCardsWrapper/TaskCardsWrapper';
import styles from './TasksScreen.module.css';
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from "react";

interface ContentProps {
    initialTaskId?: string;
}

export const TasksScreen = ({ initialTaskId }: ContentProps ) => {
    const router = useRouter();

    const routerRef = useRef(router);
    routerRef.current = router;

    const handleTaskSelect = useCallback((taskId: string) => {
        routerRef.current.push(`?task=${taskId}`, { scroll: false });
    }, []);

    return (
        <div className={styles.content}>
            <VerticalMenu />
            <TaskCardsWrapper
                initialTaskId={initialTaskId}
                onTaskSelect={handleTaskSelect}
            />
        </div>
    );
};