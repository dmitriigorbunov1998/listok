'use client';

import React from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined, UserOutlined, DashboardOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import styles from './VerticalMenu.module.css';

const MENU_ITEMS = [
    {
        key: 'dashboard',
        icon: <DashboardOutlined />,
        label: 'Дашборд',
    },
    {
        key: 'mail',
        icon: <MailOutlined />,
        label: 'Почта',
    },
    {
        key: 'apps',
        icon: <AppstoreOutlined />,
        label: 'Приложения',
    },
    {
        key: 'settings',
        icon: <SettingOutlined />,
        label: 'Настройки',
    },
    {
        key: 'profile',
        icon: <UserOutlined />,
        label: 'Профиль',
    },
];

export const VerticalMenu = () => {
    return (
        <div className={styles.menuContainer}>
            <Menu
                defaultSelectedKeys={['dashboard']}
                items={MENU_ITEMS}
                className={styles.menu}
            />
        </div>
    );
};