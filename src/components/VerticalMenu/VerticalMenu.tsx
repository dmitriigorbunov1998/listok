'use client';

import React from 'react';
import { SettingOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import styles from './VerticalMenu.module.css';

export const VerticalMenu = () => {
    const menuItems = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Мои задачи',
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
                defaultSelectedKeys={['dashboard']}
                items={menuItems}
                className={styles.menu} />
        </div>
    );
};