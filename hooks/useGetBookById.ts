import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { Book } from "@/types";

const useBookById = (id?: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState<Book | undefined>(undefined);
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    if (!id) {
      return;
    }

    setIsLoading(true);

    const fetchBook = async () => {
      const { data, error } = await supabaseClient
        .from('books')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        setIsLoading(false);
        return toast.error(error.message);
      }

      setBook(data as Book);
      setIsLoading(false);
    }

    fetchBook();
  }, [id, supabaseClient]);

  return useMemo(() => ({
    isLoading,
    book
  }), [isLoading, book]);
};

export default useBookById;