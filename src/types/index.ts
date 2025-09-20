import { TaskStatus } from '@/constants/consts';

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    createdAt: string;
}

export interface Project {
    id: number;
    name: string;
    shortName: string;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskStatus;
    projectId: number;
    createdAt: string;
    assigneeId: number;
    creatorId?: number;
}