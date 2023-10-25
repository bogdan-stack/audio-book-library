import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Book } from "@/types";

const useLoadBookUrl = (book: Book) => {
  const supabaseClient = useSupabaseClient();

  if (!book) {
    return '';
  }

  const { data: bookData } = supabaseClient
  .storage
  .from('books')
  .getPublicUrl(book.book_path);

  return bookData.publicUrl;
};

export default useLoadBookUrl;