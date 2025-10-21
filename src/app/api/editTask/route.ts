import { supabase } from '../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { changeCamelToSnakeCase } from '../../../utils/changeCamelToSnakeCase';

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.id) {
            return NextResponse.json(
                { error: 'Task ID is required' },
                { status: 400 }
            );
        }

        const taskId = body.id;

        const restrictedFields = ['id', 'created_at', 'creator_id', 'project_id'];
        const updates = { ...body };

        restrictedFields.forEach(field => {
            delete updates[field];
        });

        if (Object.keys(updates).length === 0) {
            return NextResponse.json(
                { error: 'No valid fields to update' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('tasks')
            .update(changeCamelToSnakeCase(updates))
            .eq('id', taskId)
            .select();

        if (error) throw error;

        return NextResponse.json(
            {
                message: 'Task updated successfully',
                data: data[0]
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Update error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}