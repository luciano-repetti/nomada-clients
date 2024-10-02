export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    createdAt: string;
}

export type ModeView = 'list' | 'detail' | 'add' | 'edit';
