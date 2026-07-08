// Mirrors the Postgres schema from Phase 2. The top-level shape under
// `public` — Tables, Views, Functions, Enums, CompositeTypes — must all
// be present, even when empty, because supabase-js's internal generics
// index through several of these together. Omitting any of them can
// cause every query to silently resolve to `never`.

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
                    id:           string
                    username:     string
                    display_name: string
                    bio:          string
                    avatar_url:   string
                    role:         'free' | 'pro'
                    created_at:   string
                    updated_at:   string
                }
                Insert: {
                    id:            string
                    username:      string
                    display_name?: string
                    bio?:          string
                    avatar_url?:   string
                    role?:         'free' | 'pro'
                }
                Update: {
                    username?:     string
                    display_name?: string
                    bio?:          string
                    avatar_url?:   string
                    role?:         'free' | 'pro'
                }
                // profiles only references auth.users, which sits outside the
                // typed `public` schema — nothing to declare here.
                Relationships: []
            }

            links: {
                Row: {
                    id:          string
                    profile_id:  string
                    title:       string
                    url:         string
                    sort_order:  number
                    is_active:   boolean
                    created_at:  string
                    updated_at:  string
                }
                Insert: {
                    id?:          string
                    profile_id:   string
                    title:        string
                    url:          string
                    sort_order?:  number
                    is_active?:   boolean
                }
                Update: {
                    title?:       string
                    url?:         string
                    sort_order?:  number
                    is_active?:   boolean
                }
                // Declares the FK from Phase 2b — this is what enables typed
                // nested selects like .select('*, links(*)') from profiles.
                // The constraint name matches what Postgres auto-generated
                // (you actually saw this exact name in the 2b rejection test).
                Relationships: [
                    {
                        foreignKeyName: 'links_profile_id_fkey'
                        columns: ['profile_id']
                        isOneToOne: false
                        referencedRelation: 'profiles'
                        referencedColumns: ['id']
                    },
                ]
            }
        }
        Views: { [_ in never]: never }
        Functions: { [_ in never]: never }
        Enums: { [_ in never]: never }
        CompositeTypes: { [_ in never]: never }
    }
}