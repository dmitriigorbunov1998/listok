import './HorizontalMenu.css';
import {
    NotificationOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Drawer } from 'antd';

export const HorizontalMenu = (props: any) => {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleRedirectToAuth = () => {
        router.push('/auth');
    };

    return (
        <div>
            <div className="horizontalMenuContainer">
                <div className="horizontalMenuLogo">listok</div>
                <div className="horizontalMenuContent">
                    <div className="horizontalMenuNotifications" onClick={showDrawer}>
                        <NotificationOutlined />
                    </div>
                    <div className="horizontalMenuProfile">
                        <div className="horizontalMenuProfileLogo">
                            <div className="horizontalMenuProfileIcon"></div>
                        </div>
                        <div className="horizontalMenuProfileButton" onClick={handleRedirectToAuth}>
                            <LogoutOutlined />
                        </div>
                    </div>
                </div>
            </div>
            <Drawer
                title="Уведомления"
                closable={{ 'aria-label': 'Close Button' }}
                onClose={onClose}
                open={open}
            >
            </Drawer>
        </div>
    );
}