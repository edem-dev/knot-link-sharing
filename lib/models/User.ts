// lib/models/User.ts
import mongoose, { Schema } from 'mongoose'

// ── Link sub-document ──────────────────────────────────────────────────────────
// Links are embedded in the User document — no separate collection.
// This is correct for the MVP because:
//   - Links are always fetched with the user (no extra query needed)
//   - A user will never have more than ~50 links (no pagination needed)
//   - Atomic array replacement ($set: { links: [...] }) works cleanly
const LinkSchema = new Schema(
    {
        title:    { type: String, required: true, trim: true, maxlength: 100 },
        url:      { type: String, required: true, trim: true },
        order:    { type: Number, default: 0 },
        isActive: { type: Boolean, default: true },
        // isActive reserved for future "toggle link visibility" feature.
        // Not yet exposed in the UI.
    },
    { _id: true }
    // _id: true → MongoDB generates a unique ObjectId for each link.
    // This ObjectId is converted to a string and becomes the `id` field
    // in the UI's LinkRowData interface.
)

// ── User document ──────────────────────────────────────────────────────────────
const UserSchema = new Schema(
    {
        // ── Identity ───────────────────────────────────────────────────────────────
        clerkUserId: {
            type:     String,
            required: true,
            unique:   true,
            index:    true,
            // The bridge between Clerk and MongoDB.
            // auth() from @clerk/nextjs/server returns userId — this is that value.
            // Every protected API route does: User.findOne({ clerkUserId: userId })
        },

        username: {
            type:      String,
            required:  true,
            unique:    true,
            lowercase: true,   // enforced at DB level — prevents case duplicates
            trim:      true,
            index:     true,   // indexed for fast lookup on the public profile page
            // knotted.com/[getUsername] — must be unique and URL-safe.
            // Validated on creation: /^[a-z0-9_-]+$/
        },

        // ── Profile ────────────────────────────────────────────────────────────────
        displayName: {
            type:      String,
            default:   '',
            trim:      true,
            maxlength: 60,
            // IMPORTANT: stored as `displayName` in MongoDB,
            // but returned as `name` in API responses to match the UI's prop names.
        },

        bio: {
            type:      String,
            default:   '',
            maxlength: 160,
            // 160 chars — matches the Textarea atom's maxLength={160} in the editor.
        },

        avatarUrl: {
            type:    String,
            default: '',
            // Cloudinary secure_url stored here.
            // IMPORTANT: returned as `avatarSrc` in API responses to match UI props.
            // Empty string → Avatar atom shows the brand gradient fallback.
        },

        role: {
            type:    String,
            enum:    ['free', 'pro'],
            default: 'free',
            // Controls:
            //   - showBranding on PublicProfilePage (free users get "Powered by Knotted")
            //   - Future feature gates (themes, custom domains)
        },

        // ── Links ──────────────────────────────────────────────────────────────────
        links: {
            type:    [LinkSchema],
            default: [],
            // PUT /api/profile replaces this entire array on every publish.
            // The `order` field is derived from array index position on save.
        },
    },
    {
        timestamps: true,
        // Automatically adds `createdAt` and `updatedAt` fields.
        // updatedAt is updated by Mongoose on every save/findOneAndUpdate.
    }
)

// Prevent "Cannot overwrite model once compiled" errors during
// Next.js hot reloads in development.
export default mongoose.models.User || mongoose.model('User', UserSchema)