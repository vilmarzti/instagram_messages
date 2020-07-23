import { Message } from './message/message';

export interface ChatLog {
    conversation: Message[];
    participants: string[];
    id?: number;
}
