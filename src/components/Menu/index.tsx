import styles from './Menu.module.css';
import { MailOutlined } from "@ant-design/icons";

export const Menu = () => {
    return (
        <div className={styles.container}>
            <MailOutlined />
            <div className={styles.titles}>Задачи</div>
        </div>
    )
}