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
            const response = await axios.get('/api/tasks');
            setTasks(response.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { tasks, loading, error, getTasks };
};