import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Menu.module.css';
import { MailOutlined } from '@ant-design/icons';

export const Menu = () => {
    const navigate = useNavigate();

    const handleClick = async () => {
        try {
            const response = await fetch('https://tasks.ru/api/tasks?projectId=1');
            const data = await response.json();

            navigate('/tasks');
        } catch (error) {
            console.log('Ошибка при получении данных:', error);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>МЕНЮ</div>
            <div className={styles.data} onClick={handleClick}>
                <MailOutlined />
                <div className={styles.titles}>Задачи</div>
            </div>
        </div>
    )
}