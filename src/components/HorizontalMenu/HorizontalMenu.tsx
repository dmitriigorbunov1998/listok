import './HorizontalMenu.css';
import {
    NotificationOutlined,
    LogoutOutlined,
} from '@ant-design/icons';
import {useRouter} from "next/navigation";

export const HorizontalMenu = (props: any) => {
    const router = useRouter();

    const handleRedirectToAuth = () => {
        router.push('/auth');
    };

    return (
        <div className="horizontalMenuContainer">
            <div className="horizontalMenuLogo">listok</div>
            <div className="horizontalMenuContent">
                <div className="horizontalMenuNotifications">
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
    );
}