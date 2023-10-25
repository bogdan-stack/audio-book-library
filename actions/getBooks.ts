import { Book } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const getBooks = async (): Promise<Book[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    const { data, error } = await supabase
    .from('books')
    .select('*')
    .order('created_at', { ascending: false });

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
}

export default getBooks;