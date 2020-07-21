import { Message } from './message';

export interface ChatLog {
    fileName: string;
    messages: Message[];
    id?: number;
    url?: string;
}
