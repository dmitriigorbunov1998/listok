'use client';

import React from 'react';
import { App, ConfigProvider } from 'antd';

export function AntdProvider({ children }: { children: React.ReactNode }) {
    return (
        <ConfigProvider>
            <App>
                {children}
            </App>
        </ConfigProvider>
    );
}