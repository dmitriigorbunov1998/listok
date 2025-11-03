import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(req: NextRequest) {
    const res = NextResponse.next();
    const { pathname } = req.nextUrl;

    // Создаем Supabase SSR клиент
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return req.cookies.getAll().map(({ name, value }) => ({ name, value }));
                },
                setAll(cookies) {
                    for (const { name, value, options } of cookies) {
                        res.cookies.set(name, value, options);
                    }
                },
            },
        }
    );

    // Получаем текущего пользователя
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const isAuthPage = pathname.startsWith('/auth');
    const isRegisterPage = pathname.startsWith('/register');

    // --- 🔒 Защита: если пользователь не авторизован ---
    if (!user && !isAuthPage && !isRegisterPage) {
        const redirectUrl = new URL('/auth', req.url);
        return NextResponse.redirect(redirectUrl);
    }

    // --- 🚫 Если пользователь авторизован, не пускаем на /auth и /register ---
    if (user && (isAuthPage || isRegisterPage)) {
        const redirectUrl = new URL('/', req.url);
        return NextResponse.redirect(redirectUrl);
    }

    return res;
}

export const config = {
    // ✅ Middleware применяется ко всем маршрутам, кроме _next, статических и api
    matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
