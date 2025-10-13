import { toast } from 'react-toastify';

interface DeleteTaskData {
    id: number,
}

export const useDeleteTask = () => {
    const deleteTask = async (taskData: DeleteTaskData): Promise<boolean> => {
        try {
            const response = await fetch('/api/deleteTask', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                throw new Error(`Ошибка при выполнении запроса (${response.status})`);
            }

            await response.json();
            toast.success('Задача удалена');

            return true;
        } catch (error) {
            toast.error('Не удалось удалить задачу');
            console.error('Ошибка при удалении задачи:', error);
            return false;
        }
    }

    return {
        deleteTask,
    };
};