
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
      products: {
        Row: {
          id: string
          title: string
          description: string
          price: number
          original_price: number | null
          images: string[]
          source: 'amazon' | 'alibaba'
          category: string | null
          in_stock: boolean
          specifications: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          price: number
          original_price?: number | null
          images: string[]
          source: 'amazon' | 'alibaba'
          category?: string | null
          in_stock?: boolean
          specifications?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          price?: number
          original_price?: number | null
          images?: string[]
          source?: 'amazon' | 'alibaba'
          category?: string | null
          in_stock?: boolean
          specifications?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'completed' | 'cancelled'
          total: number
          created_at: string
          updated_at: string
          shipping_address: Json
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total: number
          created_at?: string
          updated_at?: string
          shipping_address: Json
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'completed' | 'cancelled'
          total?: number
          created_at?: string
          updated_at?: string
          shipping_address?: Json
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
