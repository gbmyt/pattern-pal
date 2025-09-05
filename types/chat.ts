export enum ROLES {
    SUGGESTION = "suggestion",
    USER = "user",
    AI = "AI"
}
export interface Message {
    role: string;
    content: string;
}