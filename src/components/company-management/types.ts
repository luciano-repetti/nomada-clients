export interface Company {
    id: number
    name: string
    emails: string[]
    phones: string[]
    address: string
    created_at: string
    website: string
}

export type ModeView = 'list' | 'detail' | 'add' | 'edit';
