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
import React from 'react';
import { Project, Task, User } from '@/types';
import { TaskCardStatus } from '@/components/TaskCardsWrapper/TaskCard/TaskCardStatus/TaskCardStatus';
import { formatDateTime } from '@/utils/date';

const items: MenuProps['items'] = [
    {
        label: 'В статус "В работе"',
        key: '1',
    },
    {
        label: 'В статус "Отклонено"',
        key: '2',
    },
    {
        label: 'В статус "Открыто"',
        key: '3',
    },
    {
        type: 'divider',
    },
    {
        label: 'Удалить',
        key: '4',
        danger: true,
    },
];

const menuProps = {
    items,
};

interface TaskPageProps {
    selectedTask: Task;
    projects: Project[];
    users: User[];
}

export const TaskPage = ({ selectedTask, projects, users }: TaskPageProps) => {
    const { title, description, id, creatorId, createdAt, status, projectId, assigneeId } = selectedTask;
    const project = projects.find(project => project.id === projectId);
    const assigneeUser = users.find(user => user.id === assigneeId);
    const creatorUser = users.find(user => user.id === creatorId);

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