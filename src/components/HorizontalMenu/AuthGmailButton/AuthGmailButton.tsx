'use client';
import { createClient } from '@/app/lib/supabase/client';
import { Button, message } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';

export function AuthGmailButton(props: any) {
    const supabase = createClient();

    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`
            },
        });
        if (error) message.error(error.message);
    };

    return (
        <Button
            type="default"
            onClick={handleLogin}
            style={{ width: '100%', marginTop: 16 }}
        >
            <GoogleOutlined />
            Войти через Google
        </Button>
    );
}
