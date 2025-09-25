interface DeleteTaskData {
    id: number,
}

export const useDeleteTask = () => {
    const deleteTask = async (taskData: DeleteTaskData): Promise<boolean> => {
        try {
            const response = await fetch(`/api/deleteTask?id=${taskData.id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Ошибка при выполнении запроса (${response.status})`);
            }

            await response.json();

            return true;
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
            return false;
        }
    }

    return {
        deleteTask,
    };
};