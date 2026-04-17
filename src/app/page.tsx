import { TasksScreen } from '@/components/TasksScreen/TasksScreen';

export default async function Home({
    searchParams
}: {
    searchParams?: Promise<{ task?: string }>
}) {
     const params = searchParams ? await searchParams : {};
    return <TasksScreen initialTaskId={params.task} />
};