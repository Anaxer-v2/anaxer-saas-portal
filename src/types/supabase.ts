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
      profiles: {
        Row: {
          id: string
          first_name: string
          last_name: string
          email: string
          workflow_step: 'created' | 'entity_pending' | 'completed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          first_name: string
          last_name: string
          email: string
          workflow_step?: 'created' | 'entity_pending' | 'completed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          first_name?: string
          last_name?: string
          email?: string
          workflow_step?: 'created' | 'entity_pending' | 'completed'
          created_at?: string
          updated_at?: string
        }
      }
      entities: {
        Row: {
          id: string
          name: string
          industry: string
          country_code: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          industry: string
          country_code: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          industry?: string
          country_code?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      requirement_templates: {
        Row: {
          id: string
          entity_id: string
          title: string
          instruction: string | null
          type: 'document_upload' | 'custom_form'
          form_json: Json | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          entity_id: string
          title: string
          instruction?: string | null
          type: 'document_upload' | 'custom_form'
          form_json?: Json | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          entity_id?: string
          title?: string
          instruction?: string | null
          type?: 'document_upload' | 'custom_form'
          form_json?: Json | null
          created_by?: string
          created_at?: string
          updated_at?: string
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
      registration_status: 'created' | 'entity_pending' | 'completed'
      requirement_type: 'document_upload' | 'custom_form'
    }
  }
} 