interface EditTaskData {
    id: number;
    title?: string;
    status?: string;
    description?: string;
    assigneeId?: number;
}

export const useEditTask = () => {
    const editTask = async (taskData: EditTaskData): Promise<boolean> => {
        try {
            const response = await fetch('/api/editTask', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(taskData),
            });

            if (!response.ok) {
                throw new Error('Ошибка при выполнении запроса');
            }

            await response.json();
            return true;
        } catch (error) {
            console.error('Неизвестная ошибка', error);
            return false;
        }
    };

    return {
        editTask,
    };
};