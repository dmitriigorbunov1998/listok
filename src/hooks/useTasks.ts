import { useState, useCallback } from 'react';
import axios from 'axios';
import { Task, Project } from '@/types/types';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const [responseTasks, responseProjects] = await Promise.all([
                axios.get<Task[]>('api/tasks'),
                axios.get<Project[]>('api/projects'),
            ]);

            setTasks(responseTasks.data);
            setProjects(responseProjects.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Failed to load data');
        } finally {
            setLoading(false);
        }
    }, []);

    const addTask = useCallback((newTask: Task) => {
        setTasks(prevTasks => [...prevTasks, newTask]);
    }, []);

    return {
        tasks,
        projects,
        loading,
        error,
        fetchTasks,
        addTask
    };
};