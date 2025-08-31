'use client';

import React from 'react';
import { SettingOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import styles from './VerticalMenu.module.css';

export const VerticalMenu = () => {
    const MENU_ITEMS = [
        {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
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
                items={MENU_ITEMS}
                className={styles.menu} />
        </div>
    );
};