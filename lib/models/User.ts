import mongoose, { Schema, Document } from 'mongoose';

export interface ILink {
    title: string;
    url: string;
    order: number;
    isActive: boolean;
}

export interface IUser extends Document {
    clerkUserId: string;
    username: string;
    displayName: string;
    bio: string;
    avatarUrl: string;
    role: 'free' | 'pro';
    links: ILink[];
    createdAt: Date;
}

const LinkSchema = new Schema<ILink>({
    title:    { type: String, required: true },
    url:      { type: String, required: true },
    order:    { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
});

const UserSchema = new Schema<IUser>(
    {
        clerkUserId:  { type: String, required: true, unique: true },
        username:     { type: String, required: true, unique: true, lowercase: true, trim: true },
        displayName:  { type: String, default: '' },
        bio:          { type: String, default: '' },
        avatarUrl:    { type: String, default: '' },
        role:         { type: String, enum: ['free', 'pro'], default: 'free' },
        links:        { type: [LinkSchema], default: [] },
    },
    { timestamps: true }
);

// Prevent model re-registration during hot reloads
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);