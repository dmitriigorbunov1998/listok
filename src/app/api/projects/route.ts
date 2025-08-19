import { supabase } from '@/src/app/lib/supabase';

export async function GET() {
    try {
        const { data } = await supabase
            .from('projects')
            .select('*')

        return new Response(
            JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    } catch (error) {
        console.error(error);

        return new Response('Internal Server Error', { status: 500 });
    }
}