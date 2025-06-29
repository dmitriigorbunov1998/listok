import { Tag } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, ExclamationCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { useMemo } from "react";

interface StatusProps {
    status: string;
}

export const Status = ({ status }: StatusProps) => {
    const properties = useMemo(() => {
        switch (status) {
            case "done":
                return {
                    color: "success",
                    text: "Выполнено",
                    icon: <CheckCircleOutlined />,
                };
            case "inProgress":
                return {
                    color: "processing",
                    text: "В работе",
                    icon: <SyncOutlined />,
                };
            case "review":
                return {
                    color: "warning",
                    text: "Ревью",
                    icon: <ExclamationCircleOutlined />,
                };
            default:
                return {
                    color: "default",
                    text: "Создано",
                    icon: <ClockCircleOutlined />,
                };
        }
    }, [status]);

    return (
        <Tag icon={properties.icon} color={properties.color}>
            {properties.text}
        </Tag>
    )
}