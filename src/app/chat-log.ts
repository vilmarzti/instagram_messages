import { Message } from './chat/message/message';

export interface ChatLog {
    fileName: string;
    messages: Message[];
    id?: number;
    url?: string;
}
