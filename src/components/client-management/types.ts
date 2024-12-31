export interface Client {
    _id: number;
    name: string;
    emails: string[];
    phones: string[];
    address: string;
    created_at: string;
}

export type ModeView = 'list' | 'detail' | 'add' | 'edit';
