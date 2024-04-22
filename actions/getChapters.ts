import { Chapter } from '@/types';


const getChapters = async (): Promise<Chapter[]> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_FULL_URL}/allChapters`);
    if (!response.ok) {
        throw new Error('Failed to fetch chapters');
    }
    const data = await response.json();

    return (data as any) || [];
}

export default getChapters;