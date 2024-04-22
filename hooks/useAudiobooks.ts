import { Audiobook } from '@/types';
import { useState, useEffect, use } from 'react';
import { useUser } from '@/hooks/useUserAuth'

export const useAudiobooks = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [audiobooks, setAudiobooks] = useState<Audiobook[]>([]); // Initialize with an empty array

  const user = useUser();

  useEffect(() => {
    const fetchAllAudiobooks = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_FULL_URL}/allAudiobooks`);
        if (!response.ok) {
          throw new Error('Failed to fetch audiobooks');
        }
        const data = await response.json();
        setAudiobooks(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching audiobooks:', error);
        setIsLoading(false);
      }
    };

    fetchAllAudiobooks();
  }, []);

if (user !== null) {

  return { audiobooks };
} else {
  return { audiobooks: [] };
}
};