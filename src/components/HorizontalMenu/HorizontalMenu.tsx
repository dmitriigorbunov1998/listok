'use client';

import './HorizontalMenu.css';
import { NotificationOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button, Drawer, List, Typography, Empty, Space } from 'antd';
import { AuthLogoutButton } from '@/components/HorizontalMenu/AuthLogoutButton/AuthLogoutButton';
import { useNotifications } from '@/app/providers/NotificationProvider';

const { Text } = Typography;

export const HorizontalMenu = () => {
    const router = useRouter();
    const [openNotifications, setOpenNotifications] = useState(false);
    const { notifications, removeNotification } = useNotifications();

    const showDrawer = () => setOpenNotifications(true);
    const onCloseDrawer = () => setOpenNotifications(false);

    async function handleRedirectToAuth() {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/auth');
    }

    return (
        <div className="horizontalMenu">
            <div className="horizontalMenuContainer">
                <div className="horizontalMenuLogo">listok</div>
                <div className="horizontalMenuContent">
                    <Button
                        icon={<NotificationOutlined />}
                        onClick={showDrawer}
                    >
                        Уведомления ({notifications.length})
                    </Button>
                    <div className="horizontalMenuLogout" onClick={handleRedirectToAuth}>
                        <AuthLogoutButton />
                    </div>
                </div>
            </div>

            <Drawer
                title="Уведомления"
                placement="right"
                onClose={onCloseDrawer}
                open={openNotifications}
                width={350}
            >
                {notifications.length > 0 ? (
                    <List
                        dataSource={[...notifications].reverse().slice(0, 10)}
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button
                                        key="delete"
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        onClick={() => removeNotification(item.id)}
                                    />,
                                ]}
                            >
                                <Space direction="vertical" size={2}>
                                    <Text type={item.type === 'error' ? 'danger' : undefined}>
                                        {item.text}
                                    </Text>
                                </Space>
                            </List.Item>
                        )}
                    />
                ) : (
                    <Empty description="Нет уведомлений" />
                )}
            </Drawer>
        </div>
    );
};
