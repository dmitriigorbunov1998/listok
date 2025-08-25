import { supabase } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*');

        if (error) {
            console.error('Supabase projects error:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        console.log('Projects data received:', data); // Для отладки
        return NextResponse.json(data);
    } catch (error) {
        console.error('Internal server error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}