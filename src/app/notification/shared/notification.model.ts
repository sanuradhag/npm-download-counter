export interface INotification {
    title: string;
    content: string;
    type: Type;
}

export enum Type {
    SUCCESS,
    ERROR,
    WARNING,
    INFO,
    ALERT,
    BARE
}
