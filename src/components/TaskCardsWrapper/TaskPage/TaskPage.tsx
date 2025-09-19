import styles from './TaskPage.module.css';
import { Breadcrumb } from 'antd';
import {
    ClockCircleOutlined,
    FormOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    SyncOutlined
}
from '@ant-design/icons';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Space } from 'antd';
import React, { useCallback } from 'react';
import { Project, Task, User } from '@/types';
import { TaskCardStatus } from '@/components/TaskCardsWrapper/TaskCard/TaskCardStatus/TaskCardStatus';
import { formatDateTime } from '@/utils/date';
import { TaskStatus } from '@/consts';
import { taskStatusLabel, taskStatusTransitions } from '@/utils/taskStatusTransitions';
import { useEditTask } from '@/hooks/useEditTask';

interface TaskPageProps {
    selectedTask: Task;
    projects: Project[];
    users: User[];
    getTasks: () => void;
}

export const TaskPage = ({ selectedTask, projects, users, getTasks }: TaskPageProps) => {
    const { title, description, id, creatorId, createdAt, status, projectId, assigneeId } = selectedTask;
    const project = projects.find(project => project.id === projectId);
    const assigneeUser = users.find(user => user.id === assigneeId);
    const creatorUser = users.find(user => user.id === creatorId);
    const { editTask } = useEditTask();

    const handleStatusChange = useCallback(async (newStatus: TaskStatus) => {
        const success = await editTask({
            id,
            status: newStatus
        });

        if (success) {
            getTasks();
        }
    }, [getTasks]);

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
        }, [])
    }, []);

    const items: MenuProps['items'] = [
        ...availableTransitions(status),
        {
            type: 'divider',
        },
        {
            label: 'Удалить',
            key: taskStatusTransitions[status].length + 1,
            danger: true,
        },
    ];

    const menuProps = {
        items,
    };

    return (
        <div className={styles.wrapper}>
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
                            <>
                                <div className={styles.breadcrumbTaskText}>{project?.shortName}-{id}</div>
                            </>
                        )
                    },
                ]}
            />
            <div className={styles.taskDescriptionInfo}>
                <div className={styles.taskTitleText}>{title}</div>
                <div className={styles.taskDropDown}>
                    <div className={styles.taskDropDownMenu}>
                        <Dropdown menu={menuProps} className={styles.taskDropDownMenu}>
                            <Button>
                                <Space>
                                    Действия
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                    <div className={styles.taskEdit}><FormOutlined /></div>
                </div>
            </div>
            <div className={styles.taskStatus}>
                <SyncOutlined />
                <div className={styles.taskStatusText}>Статус:</div>
                <div className={styles.taskStatusTextDynamic}>
                    <TaskCardStatus status={status} />
                </div>
            </div>
            <div className={styles.taskAssignee}>
                <UserOutlined />
                <div className={styles.taskAssigneeText}>Исполнитель:</div>
                <div className={styles.taskAssigneeTextDynamic}>{assigneeUser?.name}</div>
            </div>
            <div className={styles.taskCreator}>
                <UserOutlined />
                <div className={styles.taskCreatorText}>Автор:</div>
                <div className={styles.taskCreatorTextDynamic}>{creatorUser?.name}</div>
            </div>
            <div className={styles.taskCreated}>
                <ClockCircleOutlined />
                <div className={styles.taskCreatedText}>Создана:</div>
                <div className={styles.taskCreatedTextDynamic}>{formatDateTime(createdAt)}</div>
            </div>
            <div className={styles.taskDescriptionTitle}>
                <InfoCircleOutlined />
                <div className={styles.taskDescriptionTitleText}>Описание:</div>
            </div>
            <div className={styles.taskDescriptionText}>
                {description}
            </div>
        </div>
    )
};