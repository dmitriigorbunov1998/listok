import { supabase } from '@/app/lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { changeCamelToSnakeCase } from '@/utils/changeCamelToSnakeCase';

export async function POST(request: NextRequest)  {
    try {
        const body = await request.json();

        const taskData = {
            title: body.title,
            status: 'open',
            projectId: body.projectId,
            creatorId: body.creatorId,
            assigneeId: body.assigneeId,
            description: body.description,
        };

        const { data, error } = await supabase
            .from('tasks')
            .insert(changeCamelToSnakeCase(taskData));

        if (error) throw error;

        return NextResponse.json(
            {
                message: 'Successfully created task',
            },
            {
                status: 201,
            },
        )
    } catch (error) {
        console.error('Internal server error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}