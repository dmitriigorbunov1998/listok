import { useState, useCallback } from 'react';
import axios from 'axios';
import { Task, Project } from '@/types';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const loadTasks = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            console.log('Fetching tasks and projects...');

            const [tasksResponse, projectsResponse] = await Promise.all([
                axios.get('/api/tasks'),
                axios.get('/api/projects')
            ]);

            console.log('Tasks response:', tasksResponse.data);
            console.log('Projects response:', projectsResponse.data);

            setTasks(tasksResponse.data);
            setProjects(projectsResponse.data);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Неизвестная ошибка';
            console.error('Error in useTasks:', err);
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }, []);

    return { tasks, projects, loading, error, loadTasks };
};