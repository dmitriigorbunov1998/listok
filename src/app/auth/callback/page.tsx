'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/client';
import { message } from 'antd';

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const handleCallback = async () => {
            const supabase = createClient();

            const { data, error } = await supabase.auth.getSession();

            if (error) {
                console.error(error);
                message.error('Ошибка авторизации');
                router.push('/auth');
                return;
            }

            if (data?.session) {
                message.success('Добро пожаловать!');
                router.push('/');
            } else {
                message.warning('Не удалось получить сессию');
                router.push('/auth');
            }
        };

        handleCallback();
    }, [router]);
}
