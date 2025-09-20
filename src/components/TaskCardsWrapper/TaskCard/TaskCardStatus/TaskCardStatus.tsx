import { Tag } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { taskStatusLabel } from '@/utils/taskStatusTransitions';
import { TaskStatus } from '@/consts';

interface TaskCardStatusProps {
    status: TaskStatus;
}

export const TaskCardStatus = ({ status }: TaskCardStatusProps) => {
    const properties = useMemo(() => {
        switch (status) {
            case TaskStatus.Done:
                return {
                    color: "success" as const,
                    text: "Выполнено",
                    icon: <CheckCircleOutlined />,
                };
            case TaskStatus.InProgress:
                return {
                    color: "processing" as const,
                    text: "В работе",
                    icon: <SyncOutlined />,
                };
            case TaskStatus.Review:
                return {
                    color: "warning" as const,
                    text: "Ревью",
                    icon: <ExclamationCircleOutlined />,
                };
            default:
                return {
                    color: "default" as const,
                    text: taskStatusLabel[status],
                    icon: <ClockCircleOutlined />,
                };
        }
    }, [status]);

    return (
        <Tag icon={properties.icon} color={properties.color}>
            {properties.text}
        </Tag>
    );
};