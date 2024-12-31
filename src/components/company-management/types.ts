export interface Company {
    _id: string;
    id: string
    name: string
    emails: string[]
    phones: string[]
    address: string
    website: string
    createdAt: string;
    updatedAt: string;
    __v?: number;
}

export type ModeView = 'list' | 'detail' | 'add' | 'edit';
