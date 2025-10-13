'use client';

import React from 'react';

import {
    SettingOutlined,
    UserOutlined,
    DashboardOutlined,
    ProjectOutlined
} from '@ant-design/icons';

import { Menu } from 'antd';
import styles from './VerticalMenu.module.css';
import { useRouter } from 'next/navigation';

export const VerticalMenu = () => {
    const router = useRouter();

    const handleMenuClick = ({ key }: { key: string }) => {
        switch (key) {
            case 'projects':
                router.push('/projects');
                break;
            default:
                router.push('/');
        }
    };

    const items = [
        {
            key: 'tasks',
            icon: <DashboardOutlined />,
            label: 'Мои задачи',
        },
        {
            key: 'projects',
            icon: <ProjectOutlined />,
            label: 'Мои проекты',
        },
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Профиль',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Настройки',
        },
    ];

    return (
        <div className={styles.menuContainer}>
            <Menu
                defaultSelectedKeys={['/']}
                items={items}
                className={styles.menu}
                onClick={handleMenuClick}
            />
        </div>
    );
};