// hooks/useTasks.ts
import { useState, useCallback } from 'react';
import axios from 'axios';
import { Task } from '@/types';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Fetching tasks...');
            const response = await axios.get('/api/tasks');
            console.log('Tasks response:', response.data);
            setTasks(response.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
            console.error('Error in useTasks:', err);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { tasks, loading, error, getTasks };
};