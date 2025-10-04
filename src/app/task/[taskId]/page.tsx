import { TasksScreen } from '@/components/TasksScreen/TasksScreen';

export default async function TaskPage({ params }: { params: Promise<{ taskId: string }> }) {
    const { taskId } = await params;

    return <TasksScreen initialTaskId={taskId} />;
}