export interface Company {
    name: string;
    _id: number;
}

export interface Client {
    id: number;
    _id: number;
    name: string;
    emails: string[];
    phones: string[];
    address: string;
    company?: string | Company
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export type ModeView = 'list' | 'detail' | 'add' | 'edit';
