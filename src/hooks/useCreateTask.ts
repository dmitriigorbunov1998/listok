interface CreateTaskData {
    title: string;
    projectId: number;
    description?: string;
    assigneeId: number;
}

export const useCreateTask = () => {
    const createTask = async (taskData: CreateTaskData): Promise<boolean> => {
        try {
            const response = await fetch('/api/createTask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...taskData,
                    creatorId: 1, // Временно
                }),
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
        createTask,
    };
};