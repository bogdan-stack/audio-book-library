
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