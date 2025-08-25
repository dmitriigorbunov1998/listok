import { Tag } from "antd";
import {
    CheckCircleOutlined,
    ClockCircleOutlined,
    ExclamationCircleOutlined,
    SyncOutlined
} from "@ant-design/icons";
import { useMemo } from "react";

interface TaskCardStatusProps {
    status: string;
}

export const TaskCardStatus = ({ status }: TaskCardStatusProps) => {
    const properties = useMemo(() => {
        switch (status) {
            case "done":
                return {
                    color: "success" as const,
                    text: "Выполнено",
                    icon: <CheckCircleOutlined />,
                };
            case "inProgress":
                return {
                    color: "processing" as const,
                    text: "В работе",
                    icon: <SyncOutlined />,
                };
            case "review":
                return {
                    color: "warning" as const,
                    text: "Ревью",
                    icon: <ExclamationCircleOutlined />,
                };
            default:
                return {
                    color: "default" as const,
                    text: "Создано",
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