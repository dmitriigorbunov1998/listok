'use client';

import './HorizontalMenu.css';
import { useRouter } from 'next/navigation';
import { AuthLogoutButton } from '@/components/HorizontalMenu/AuthLogoutButton/AuthLogoutButton';

export const HorizontalMenu = () => {
    const router = useRouter();

    async function handleRedirectToAuth() {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/auth');
    }

    return (
        <div className="horizontalMenu">
            <div className="horizontalMenuContainer">
                <div className="horizontalMenuLogo">listok</div>
                <div className="horizontalMenuContent">
                    <div className="horizontalMenuLogout" onClick={handleRedirectToAuth}>
                        <AuthLogoutButton />
                    </div>
                </div>
            </div>
        </div>
    );
};
