import { supabase } from '@/app/lib/supabase';
import { NextResponse } from 'next/server';
import { changeSnakeToCamelCase } from '@/utils/changeSnakeToCamelCase';
export async function GET() {
    try {
        const { data, error } = await supabase
            .from('tasks')
            .select('*');

        if (error) {
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        const camelCaseData = data.map(task => changeSnakeToCamelCase(task));

        /*
        // Временно на случае ошибок функции changeSnakeToCamelCase
        const camelCaseData = data.map((task) => {
            return {
                ...task,
                createdAt: task.created_at,
                projectId: task.project_id,
                assigneeId: task.assignee_id,
                creatorId: task.creator_id
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