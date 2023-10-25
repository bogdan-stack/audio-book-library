import { Book } from '@/types';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import getBooks from './getBooks';

const getBooksByTitle = async (denumire: string): Promise<Book[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    });

    if (!denumire) {
        const allBooks = await getBooks();
        return allBooks;
      }

    const { data, error } = await supabase
    .from('books')
    .select('*')
    .ilike('denumire', `%${denumire}%`)
    .order('created_at', { ascending: false });

    if (error) {
        console.log(error);
    }

    return (data as any) || [];
}

export default getBooksByTitle;