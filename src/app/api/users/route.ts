import { supabase } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';
import { changeSnakeToCamelCase } from "@/utils/changeSnakeToCamelCase";

export async function GET() {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*');

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        const camelCaseData = data.map(user => changeSnakeToCamelCase(user));

        /*
        // Временно на случае ошибок функции changeSnakeToCamelCase
        const camelCaseData = data.map((user) => {
            return {
                ...user,
                createdAt: user.created_at,
            }
        });
        */

        return NextResponse.json(camelCaseData);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}