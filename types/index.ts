// types/index.ts

// ── Database shapes ────────────────────────────────────────────────────────────
// These mirror the Mongoose schema exactly.

export interface DBLink {
    _id:      string
    title:    string
    url:      string
    order:    number
    isActive: boolean
}

export interface DBUser {
    _id:         string
    clerkUserId: string
    username:    string
    displayName: string   // ← stored as displayName in MongoDB
    bio:         string
    avatarUrl:   string   // ← stored as avatarUrl in MongoDB
    role:        'free' | 'pro'
    links:       DBLink[]
    createdAt:   Date
    updatedAt:   Date
}

// ── UI shapes ──────────────────────────────────────────────────────────────────
// These are the exact shapes the frontend components are typed to receive.
// API routes map DB shapes → UI shapes before responding.

export interface LinkRowData {
    id:    string   // from DBLink._id.toString()
    title: string
    url:   string
    // `order` is implicit — derived from array index position
    // `isActive` not yet exposed in the UI
}

export interface ProfilePayload {
    name:      string   // mapped from DBUser.displayName
    bio:       string
    username:  string
    avatarSrc: string   // mapped from DBUser.avatarUrl
    role:      'free' | 'pro'
    links:     LinkRowData[]
}

// ── Request payload shapes ─────────────────────────────────────────────────────
// These are what the frontend sends TO the API.

export interface PublishPayload {
    name:  string
    bio:   string
    links: LinkRowData[]
}

export interface AvatarPayload {
    avatarUrl: string
}