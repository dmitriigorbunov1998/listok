// hooks/useUsers.ts
import { useState, useCallback } from 'react';
import axios from 'axios';
import { User } from '@/types';

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getUsers = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/users');

            if (response.status === 200) {
                setUsers(response.data);
            } else {
                setError(response.statusText);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { users, loading, error, getUsers };
};