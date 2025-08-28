// hooks/useProjects.ts
import { useCallback, useState } from "react";
import axios from "axios";
import { Project } from '@/types';

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getProjects = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<Project[]>('/api/projects');

            setProjects(response.data);
        } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { projects, loading, error, getProjects };
};