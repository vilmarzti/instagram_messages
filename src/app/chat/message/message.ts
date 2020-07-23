import { Like } from './like';

export interface Message {
    sender: string;
    created_at: Date;
    text?: string;
    media_owner?: string;
    media_share_caption?: string;
    media_share_url?: string;
    likes: Like[];
    media?: string;
    link?: string;
}
