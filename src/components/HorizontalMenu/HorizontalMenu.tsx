import './HorizontalMenu.css';
import {
    NotificationOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Drawer } from 'antd';

export const HorizontalMenu = () => {
    const router = useRouter();
    const [openNotifications, setOpenNotifications] = useState(false);

    const showDrawer = () => {
        setOpenNotifications(true);
    };

    const onCloseDrawer = () => {
        setOpenNotifications(false);
    };

    const handleRedirectToAuth = () => {
        router.push('/auth');
    };

    return (
        <div className="horizontalMenu">
            <div className="horizontalMenuContainer">
                <div className="horizontalMenuLogo">listok</div>
                <div className="horizontalMenuContent">
                    <div className="horizontalMenuNotifications" onClick={showDrawer}>
                        <NotificationOutlined />
                    </div>
                    <div className="horizontalMenuLogout" onClick={handleRedirectToAuth}>
                        <LogoutOutlined />
                    </div>
                </div>
            </div>
            <Drawer
                title="Уведомления"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onCloseDrawer}
                open={openNotifications}
            >
            </Drawer>
        </div>
    );
}