import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const supabase = createRouteHandlerClient({ cookies });
    const { email, password } = await req.json();

    // Вход по email и паролю
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error('Login error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // ✅ Supabase автоматически установит session в cookies
    return NextResponse.json({ user: data.user });
}