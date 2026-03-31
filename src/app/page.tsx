import { TasksScreen } from '@/components/TasksScreen/TasksScreen';

export default function Home({
    searchParams
}: {
    searchParams: { task?: string }
}) {
    return <TasksScreen initialTaskId={searchParams.task} />
};