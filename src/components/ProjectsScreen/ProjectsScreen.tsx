'use client';

import { VerticalMenu } from '@/components/TasksScreen/VerticalMenu/VerticalMenu';
import './ProjectsScreen.css';
import { Button } from 'antd';
import { FolderAddOutlined, GithubOutlined, MoreOutlined, UserOutlined} from '@ant-design/icons';
import { formatDateTime } from '@/utils/date';
import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { ProjectCardStatus } from '@/components/ProjectsScreen/ProjectCardStatus/ProjectCardStatus';
import { useProjects } from '@/hooks/useProjects';
import { useUsers } from '@/hooks/useUsers';
import { useEffect } from 'react';

export const ProjectsScreen = () => {
    const { projects, getProjects } = useProjects();
    const { users, getUsers } = useUsers();

    useEffect(() => {
        getProjects();
        getUsers();
    }, [getProjects, getUsers])

    const projectActions = [
        'Создавать новые проекты,',
        'Присоединиться к существующим проектам, используя ссылку-приглашение.'
    ];

    const items: MenuProps['items'] = [
        {
            label: 'Редактировать',
            key: '1',
        },
        {
            label: 'Настройки доступа',
            key: '2',
        },
        {
            type: 'divider',
        },
        {
            label: 'Удалить',
            key: '3',
            danger: true,
        },
    ];

    const menuProps = {
        items,
    };

    return (
        <div className='projectsScreen'>
            <VerticalMenu />
            <div className='projectsContainerWrapper'>
                <div className='projectsTitleRow'>
                    <h2 className='projectsTitle'>Мои проекты</h2>
                    <Button type="primary" icon={<FolderAddOutlined />} >
                        <div className='projectsCreateButtonText'>Создать проект</div>
                    </Button>
                </div>
                <div className='projectsContainerCard'>
                    <div className='projectsDescription'>
                        <div>Здесь представлены проекты, к которым у вас есть доступ. Вы можете:
                            {projectActions.map((action, index) => (
                                <div key={index}>- {action}</div>
                            ))}
                        </div>
                    </div>
                    <div className='projectsItems'>
                        {projects.map((project) => {
                            return (
                                <div key={project.id} className='projectItem'>
                                    <div className='projectContainer'>
                                        <div className='projectElements'>
                                            <div className='projectLogoRow'>
                                                <div className='projectLogo'>
                                                    <img
                                                        src={project.imageUrl}
                                                        alt={project.name}
                                                    />
                                                </div>
                                                <div className='projectDropdownMenu'>
                                                    <Dropdown menu={menuProps}>
                                                        <div className='projectDropdownButton'><MoreOutlined /></div>
                                                    </Dropdown>
                                                </div>
                                            </div>
                                            <div className='projectTitle'>
                                                {project.name} {`(${project.shortName})`}
                                            </div>
                                            <div className='projectCollaboratorsContainer'>
                                                <div className='projectUserOutlined'>
                                                    <UserOutlined />
                                                </div>
                                                <div className='projectAssigneeUsers'>
                                                    {project.collaboratorsId?.map((collaboratorId)=> {
                                                        const user = users.find(user => user.id === collaboratorId);

                                                        return (
                                                            <div className='projectAssigneeUser' key={collaboratorId}>
                                                                {user?.name}
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                            <div className='projectLinkRow'>
                                                <div className='projectGithubOutlined'>
                                                    <GithubOutlined />
                                                </div>
                                                <a
                                                    href={project.githubUrl}
                                                    target='_blank'
                                                    className='projectLink'
                                                >
                                                    {project.githubUrl}
                                                </a>
                                            </div>
                                            <div className='projectStatusRow'>
                                                <div className='projectDate'>
                                                    {formatDateTime(project.createdAt)}
                                                </div>
                                                <div className='projectStatus'>
                                                    <ProjectCardStatus status={project.status} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
};