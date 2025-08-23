export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Project {
    id: number;
    name: string;
    short_name: string;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
    project_id: number;
    assigned_to: string;
    created_at: string;
    updated_at: string;
    assignee_id: number;
}

export interface TaskCardsProps {
    users: User[];
}