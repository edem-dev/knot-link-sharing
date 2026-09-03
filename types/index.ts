import type {Database} from './database.types';

export type ProfileRow = Database['public']['Tables']['profiles']['Row'];
export type LinkRow = Database['public']['Tables']['links']['Row'];

export interface LinkRowData {
    id:string
    title:string
    url:string
    isActive:boolean
}

export interface ProfilePayload {
    name:string
    bio:string
    username:string
    avatarSrc:string
    role: 'free' | 'pro'
    links: LinkRowData[]
}

export interface PublishPayload {
    name:string
    bio:string
    links: {id:string; title:string; url:string}[]
}

export interface OnboardingPayload {
    username:string
}

export interface AvatarPayload {
    avatarUrl:string
}