import { TaskStatus } from '@/constants/consts';
import { ProjectStatus } from '@/constants/consts';

export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    createdAt: string;
    projectId: number;
}

export interface Project {
    id: number;
    name: string;
    shortName: string;
    description: string;
    createdAt: string;
    status: ProjectStatus;
    githubUrl?: string;
    collaboratorsId?: number[];
    imageUrl?: string;
    ownerId?: number;
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