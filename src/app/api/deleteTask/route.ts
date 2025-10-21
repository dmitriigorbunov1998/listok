import { supabase } from '../../lib/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(request: NextRequest) {
    try {
        // Получаем тело запроса
        const body = await request.json();
        
        // Проверяем наличие обязательного поля id
        if (!body.id) {
            return NextResponse.json(
                {
                    error: 'Task ID is requored'
                },
                {
                    status: 400
                },
            );
        }

        // Извлекаем id задачи
        const taskId = body.id;

        // Удаляем задачу по заданному id
        const { data, error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId)
            .select();

        // Обрабатываем ошибку
        if (error) throw error;

        // Возвращаем успешный ответ
        return NextResponse.json(
            {
                message: 'Task deleted successfully',
                data: data ? data : null,
            }, 
            { 
                status: 200
            }
        );
    } catch (error) {
        // Логируем ошибку и возвращаем статус сервера
        console.error('Delete error:', error);
        return NextResponse.json(
            {
                error: 'Internal Server Error'
            },
            {
                status: 500
            }
        );
    }
}