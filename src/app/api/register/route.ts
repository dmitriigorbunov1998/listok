import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
    try {
        const { email, password, name } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        // ✅ 1. Создаем пользователя в Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (authError) {
            console.error('Supabase auth error:', authError);
            return NextResponse.json({ error: authError.message }, { status: 400 });
        }

        const userId = authData.user?.id;

        // ✅ 2. Создаем запись в таблице `users` в Supabase (если есть)
        if (userId) {
            const { error: insertError } = await supabase.from('users').insert([
                {
                    auth_id: userId,
                    email,
                    name: name || email.split('@')[0],
                    created_at: new Date().toISOString(),
                },
            ]);

            if (insertError) {
                console.error('Insert error:', insertError);
            }
        }

        // ✅ 3. Возвращаем успешный ответ
        return NextResponse.json(
            {
                message: 'User registered successfully',
                user: authData.user,
            },
            { status: 200 }
        );
    } catch (err) {
        console.error('Unexpected error in /api/register:', err);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
