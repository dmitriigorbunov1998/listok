import './TaskPage.css';
import { useCallback, useState } from 'react';
import { Breadcrumb } from 'antd';
import {
    ClockCircleOutlined,
    FormOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    SyncOutlined,
    DownOutlined,
    UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space, message } from 'antd';
import React from 'react';
import { Project, Task, User } from '@/types';
import { TaskCardStatus } from '@/components/TasksScreen/TaskCardsWrapper/TaskCard/TaskCardStatus/TaskCardStatus';
import { formatDateTime } from '@/utils/date';
import { TaskModalWindow } from '../TaskModalWindow/TaskModalWindow';
import { useEditTask } from '@/hooks/useEditTask';
import { useDeleteTask } from '@/hooks/useDeleteTask';
import { taskStatusLabel, taskStatusTransitions } from '@/utils/taskStatusTransitions';
import { TaskStatus } from '@/constants/consts';

interface TaskPageProps {
    selectedTask: Task;
    projects: Project[];
    users: User[];
    getTasks: () => void;
}

export const TaskPage = ({
    selectedTask,
    projects,
    users,
    getTasks,
}: TaskPageProps) => {
    const { title, description, id, creatorId, createdAt, status, projectId, assigneeId } = selectedTask;
    const project = projects.find(project => project.id === projectId);
    const assigneeUser = users.find(user => user.id === assigneeId);
    const creatorUser = users.find(user => user.id === creatorId);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const { editTask } = useEditTask();
    const { deleteTask } = useDeleteTask();

    const handleDeleteTask = useCallback(async () => {
        try {
            const success = await deleteTask({ id });
            if (success) {
                getTasks();
                message.success('Задача успешно удалена');
            }
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
            message.error('Ошибка при удалении задачи');
        }
    }, [deleteTask, getTasks, id]);

    const handleStatusChange = useCallback(async (newStatus: TaskStatus) => {
        const success = await editTask({
            id,
            status: newStatus
        });

        if (success) {
            getTasks();
        }
    }, [editTask, id, getTasks]);

    const handleClick = useCallback(() => {
        setIsOpen(true);
    }, []);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    const handleEditTask = useCallback(async (values: any) => {
        try {
            const success = await editTask({id, ...values});
            if (success) {
                getTasks();
                handleClose();
            }
        } catch (error) {
            console.error('Ошибка при редактировании задачи:', error);
        }
    }, [editTask, id, getTasks, handleClose]);

    const availableTransitions = useCallback((currentStatus: TaskStatus) => {
        return taskStatusTransitions[currentStatus].reduce((acc, status, index) => {
            acc.push({
                key: index + 1,
                label: (
                    <div onClick={() => handleStatusChange(status)}>
                        {taskStatusLabel[status]}
                    </div>
                ),
            });
            return acc;
        }, [] as { key: number; label: React.JSX.Element }[]);
    }, [handleStatusChange]);

    const items: MenuProps['items'] = [
        ...availableTransitions(status),
        {
            type: 'divider',
        },
        {
            label: (
                <div onClick={handleDeleteTask}>
                    Удалить
                </div>
            ),
            key: taskStatusTransitions[status].length + 1,
            danger: true,
        },
    ];

    const menuProps = {
        items,
    };

    return (
        <div className='wrapper'>
            <Breadcrumb
                items={[
                    {
                        href: '#',
                        title: (
                            <>
                                <HomeOutlined />
                                <span>Listok</span>
                            </>
                        )
                    },
                    {
                        title: (
                            <div className='breadcrumbTaskText'>
                                {project?.shortName}-{id}
                            </div>
                        )
                    },
                ]}
            />
            <div className='taskDescriptionInfo'>
                <div className='taskTitleText'>
                    {title}
                </div>
                <div className='taskDropDown'>
                    <div className='taskDropDownMenu'>
                        <Dropdown
                            menu={menuProps}
                            className='taskDropDownMenu'
                        >
                            <Button>
                                <Space>
                                    Действия
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                    <div
                        className='taskEdit'
                        onClick={handleClick}
                    >
                        <FormOutlined />
                    </div>
                </div>
            </div>
            <div className='taskStatus'>
                <SyncOutlined />
                <div className='taskStatusText'>
                    Статус:
                </div>
                <div className='taskStatusTextDynamic'>
                    <TaskCardStatus status={status} />
                </div>
            </div>
            <div className='taskAssignee'>
                <UserOutlined />
                <div className='taskAssigneeText'>
                    Исполнитель:
                </div>
                <div className='taskAssigneeTextDynamic'>
                    {assigneeUser?.name}
                </div>
            </div>
            <div className='taskCreator'>
                <UserOutlined />
                <div className='taskCreatorText'>
                    Автор:
                </div>
                <div className='taskCreatorTextDynamic'>
                    {creatorUser?.name}
                </div>
            </div>
            <div className='taskCreated'>
                <ClockCircleOutlined />
                <div className='taskCreatedText'>
                    Создана:
                </div>
                <div className='taskCreatedTextDynamic'>
                    {formatDateTime(createdAt)}
                </div>
            </div>
            <div className='taskDescriptionTitle'>
                <InfoCircleOutlined />
                <div className='taskDescriptionTitleText'>
                    Описание:
                </div>
            </div>
            <div className='taskDescriptionText'>
                {description}
            </div>
            <div>
                <TaskModalWindow
                    isVisible={isOpen}
                    onClose={handleClose}
                    users={users}
                    projects={projects}
                    onSubmit={handleEditTask}
                    type='edit'
                    description={description}
                    taskTitle={title}
                    assigneeId={assigneeId}
                    projectId={projectId}
                />
            </div>
        </div>
    )
};