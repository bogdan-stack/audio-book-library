
export interface Book {
    id: string;
    user_id: string;
    denumire: string;
    book_path: string;
    image_path: string;
};

export interface UserDetails {
    id: string;
    first_name: string;
    last_name: string;
    full_name: string;
}

export interface Audiobook {
    audiobook_id: number;
    audiobook_title: string;
    cover_path: string;
    uploader_id: number;
}

export interface Chapter {
    chapter_id: number;
    audiobook_id: number;
    chapter_title: string;
    chapter_path: string;
    chapter_number: number;
}