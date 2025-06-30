'use client';

import React from 'react';
import styles from './Menu.module.css';
import { MailOutlined } from '@ant-design/icons';
import { useRouter } from "next/navigation";

export const Menu = () => {
    const router = useRouter();

    const handleClick = () => {
        router.push('/tasks');
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>Team To Do</div>
            <div className={styles.data}>
                <MailOutlined />
                <div className={styles.titles} onClick={handleClick}>Задачи</div>
            </div>
        </div>
    )
};