'use client';
import { createClient } from '@/app/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

export function AuthLogoutButton() {
    const router = useRouter();
    const supabase = createClient();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/auth');
    };

    return <Button onClick={handleLogout}><LogoutOutlined />Выйти</Button>;
}
