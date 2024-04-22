import { Audiobook } from '@/types';


const getAudiobooks = async (): Promise<Audiobook[]> => {

    const response = await fetch(`${process.env.NEXT_PUBLIC_FULL_URL}/allAudiobooks`);
    if (!response.ok) {
        throw new Error('Failed to fetch audiobooks');
    }
    const data = await response.json();

    return (data as any) || [];
}

export default getAudiobooks;