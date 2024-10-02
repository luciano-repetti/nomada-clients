export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    created_at: string;
}

export type ModeView = 'list' | 'detail' | 'add' | 'edit';
