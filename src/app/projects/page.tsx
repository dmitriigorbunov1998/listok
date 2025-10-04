'use client';

import { ProjectsScreen } from '@/components/ProjectsScreen/ProjectsScreen';
import { useProjects } from '@/hooks/useProjects';
import { useUsers } from '@/hooks/useUsers';
import { useEffect } from 'react';

export default function Projects() {
    const { projects, getProjects } = useProjects();
    const { users, getUsers } = useUsers();

    useEffect(() => {
        getProjects();
        getUsers();
    }, [getProjects, getUsers])

    return <ProjectsScreen projects={projects} users={users} />;
}