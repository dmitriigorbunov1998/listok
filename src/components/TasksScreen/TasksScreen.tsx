'use client';

import { VerticalMenu } from '@/components/VerticalMenu/VerticalMenu';
import { TaskCardsWrapper } from '@/components/TasksScreen/TaskCardsWrapper/TaskCardsWrapper';
import './TasksScreen.css';
import { useRouter } from 'next/navigation';
import { HorizontalMenu } from '@/components/HorizontalMenu/HorizontalMenu';

interface ContentProps {
    initialTaskId?: string;
}

export const TasksScreen = ({ initialTaskId }: ContentProps ) => {
    const router = useRouter();

    return (
        <div className='tasksScreenContainer'>
            <HorizontalMenu />
            <div className='tasksScreenRow'>
                <VerticalMenu />
                <TaskCardsWrapper
                    initialTaskId={initialTaskId}
                    onTaskSelect={(taskId) => router.push(`/task/${taskId}`)}
                />
            </div>
        </div>
    );
};