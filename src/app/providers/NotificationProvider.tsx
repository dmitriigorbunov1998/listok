'use client';

import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { message } from 'antd';

interface Notification {
    id: number;
    type: 'success' | 'error' | 'info' | 'warning';
    text: string;
    timestamp: number;
}

interface NotificationContextType {
    notifications: Notification[];
    notify: (type: Notification['type'], text: string) => void;
    removeNotification: (id: number) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotifications = () => {
    const ctx = useContext(NotificationContext);
    if (!ctx) throw new Error('useNotifications must be used within NotificationProvider');
    return ctx;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    // ✅ Загружаем уведомления из LocalStorage
    useEffect(() => {
        const saved = localStorage.getItem('notifications');
        if (saved) {
            setNotifications(JSON.parse(saved));
        }
    }, []);

    // ✅ Сохраняем в LocalStorage при каждом изменении
    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const notify = useCallback((type: Notification['type'], text: string) => {
        const id = Date.now();

        const newNotification: Notification = {
            id,
            type,
            text,
            timestamp: id
        };

        setNotifications(prev => [...prev, newNotification]);

        message[type](text);
    }, []);

    const removeNotification = (id: number) => {
        setNotifications(prev => prev.filter((n) => n.id !== id));
    };

    return (
        <NotificationContext.Provider
            value={{ notifications, notify, removeNotification }}
        >
            {children}
        </NotificationContext.Provider>
    );
};