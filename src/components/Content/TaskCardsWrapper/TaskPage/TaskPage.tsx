import styles from './TaskPage.module.css';
import { useCallback, useState } from 'react';
import { Breadcrumb } from 'antd';
import { ClockCircleOutlined,
    FormOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    SyncOutlined
}
from '@ant-design/icons';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import React from 'react';
import { Project, Task, User } from '@/types';
import { TaskCardStatus } from '@/components/Content/TaskCardsWrapper/TaskCard/TaskCardStatus/TaskCardStatus';
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
        }, [] as { key: number, label: React.JSX.Element }[])
    }, []);

    const items: MenuProps['items'] = [
        ...availableTransitions(status),
        {
            type: 'divider',
        },
        {
            label: (
                <div onClick={() => handleDeleteTask()}>
                    Удалить
                </div>
            ),
            key: taskStatusTransitions[status].length + 1,
            danger: true,
        },
    ];

    const handleStatusChange = useCallback(async (newStatus: TaskStatus) => {
        const success = await editTask({
            id,
            status: newStatus
        });

        if (success) {
            getTasks();
        }
    }, [getTasks]);

    const handleClick = useCallback (() => {
        setIsOpen(true);
    }, [])

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, [])

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
    }, [handleClose])

    const handleDeleteTask = useCallback(async () => {
        try {
            const success = await deleteTask({ id });

            if (success) {
                getTasks();
                handleClose();
            }
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
        }
    }, [deleteTask, getTasks, handleClose, id]);

    return (
        <div className={styles.wrapper}>
            <Breadcrumb
                items={
                    [
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
                                <div className={styles.breadcrumbTaskText}>
                                    {project?.shortName}-{id}
                                </div>
                            )
                        },
                    ]
                }
            />

            <div className={styles.taskDescriptionInfo}>
                <div className={styles.taskTitleText}>
                    {title}
                </div>

                <div className={styles.taskDropDown}>
                    <div className={styles.taskDropDownMenu}>
                        <Dropdown
                            menu={{ items }}
                            className={styles.taskDropDownMenu}>

                            <Button>
                                <Space>
                                    Действия
                                    <DownOutlined />
                                </Space>
                            </Button>

                        </Dropdown>
                    </div>

                    <div
                        className={styles.taskEdit}
                        onClick={handleClick}
                    >
                        <FormOutlined />
                    </div>
                </div>

            </div>

            <div className={styles.taskStatus}>
                <SyncOutlined />
                <div className={styles.taskStatusText}>
                    Статус:
                </div>
                <div className={styles.taskStatusTextDynamic}>
                    <TaskCardStatus
                        status={status}
                    />
                </div>
            </div>

            <div className={styles.taskAssignee}>
                <UserOutlined />
                <div className={styles.taskAssigneeText}>
                    Исполнитель:
                </div>
                <div className={styles.taskAssigneeTextDynamic}>
                    {assigneeUser?.name}
                </div>
            </div>

            <div className={styles.taskCreator}>
                <UserOutlined />
                <div className={styles.taskCreatorText}>
                    Автор:
                </div>
                <div className={styles.taskCreatorTextDynamic}>
                    {creatorUser?.name}
                </div>
            </div>

            <div className={styles.taskCreated}>
                <ClockCircleOutlined />
                <div className={styles.taskCreatedText}>
                    Создана:
                </div>
                <div className={styles.taskCreatedTextDynamic}>
                    {formatDateTime(createdAt)}
                </div>
            </div>

            <div className={styles.taskDescriptionTitle}>
                <InfoCircleOutlined />
                <div className={styles.taskDescriptionTitleText}>
                    Описание:
                </div>
            </div>
            <div className={styles.taskDescriptionText}>
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