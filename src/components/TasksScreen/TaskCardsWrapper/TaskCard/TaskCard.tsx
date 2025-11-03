import './TaskCard.css';
import { TaskCardStatus } from '@/components/TasksScreen/TaskCardsWrapper/TaskCard/TaskCardStatus/TaskCardStatus';
import { Avatar } from 'antd';
import { ClockCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { Project, Task, User } from '@/types';

export interface TaskCardProps {
    task: Task;
    project?: Project;
    user?: User;
    onClick: () => void;
}

export const TaskCard = (
    {
        task,
        project,
        user,
        onClick
    }: TaskCardProps) => {

    const [buttonColor, setButtonColor] = useState('#EDEDED');

    const handleClick = () => {
        const backgroundColor = '#e5e9ff';
        setButtonColor(backgroundColor);
    };

    return (
        <div
            className='card'
            onClick={() => {
                handleClick();
                onClick();
            }}
            style={{
                backgroundColor: buttonColor
            }}
        >
            <div className='cardContainer'>
                <div className='rowStatus'>
                    <div className='taskId'>{project?.shortName}-{task.id}</div>
                    <TaskCardStatus status={task.status} />
                </div>
                <div className='title' title={task.title}>
                    {task.title}
                </div>
                <div className='rowAssigner'>
                    <Avatar size="small" src={user?.avatar}>
                        {user?.name?.[0]?.toUpperCase()}
                    </Avatar>
                    <div className='assigner'>{user?.name}</div>
                </div>
                <div className='data'>
                    <div className='rowProjectName'>
                        <div className='rowProjectNameText'>
                            <EnvironmentOutlined />
                            <div className='projectName'>{project?.name}</div>
                        </div>
                    </div>
                    <div className='rowDate'>
                        <div className='rowDateText'>
                            <ClockCircleOutlined />
                            <div className='date'>
                                {new Date(task.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};