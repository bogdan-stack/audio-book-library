export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      books: {
        Row: {
          book_path: string | null
          created_at: string
          denumire: string | null
          id: number
          image_path: string | null
        }
        Insert: {
          book_path?: string | null
          created_at?: string
          denumire?: string | null
          id?: number
          image_path?: string | null
        }
        Update: {
          book_path?: string | null
          created_at?: string
          denumire?: string | null
          id?: number
          image_path?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          full_name: string | null
          id: string
        }
        Insert: {
          full_name?: string | null
          id: string
        }
        Update: {
          full_name?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      chapters: {
        Row: {
          chapter_title: string | null
          chapter_progress: number | null
          id: number
        }
        Insert: {
          chapter_title?: string | null
          chapter_progress?: number | null
          id?: number
        }
        Update: {
          chapter_title?: string | null
          chapter_progress?: number | null
          id?: number
        }
        Relationships: [
          {
            foreignKeyName: "book_id_fkey"
            columns: ["id"]
            referencedRelation: "books"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    

    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
