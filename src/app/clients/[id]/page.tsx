'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ClientDetail } from '@/components/client-management/ClientDetail'
import { Client } from '@/components/client-management/types'

const dummyClients: Client[] = [
    {
        id: 1,
        name: 'John Doe',
        emails: ['john@example.com', 'johndoe@gmail.com', 'johndoe@gmail.com'],
        phones: ['123-456-7890', '098-765-4321'],
        address: '123 Main St',
        created_at: '2024-08-15T10:30:00Z',
    },
    {
        id: 2,
        name: 'Jane Smith',
        emails: ['jane@example.com'],
        phones: ['098-765-4321'],
        address: '456 Elm St',
        created_at: '2024-08-15T10:30:00Z'
    },
    {
        id: 3,
        name: 'Alice Johnson',
        emails: ['alice@example.com'],
        phones: ['555-123-4567'],
        address: '789 Oak Ave',
        created_at: '2024-08-15T10:30:00Z'
    },
    {
        id: 4,
        name: 'Bob Williams',
        emails: ['bob@example.com', 'bob.williams@company.com'],
        phones: ['777-888-9999', '666-555-4444'],
        address: '321 Pine Rd',
        created_at: '2024-08-15T10:30:00Z'
    },
]


export default function ClientDetailPage() {
    const params = useParams()
    const router = useRouter()

    const clientId = Number(params.id)
    const selectedClient = dummyClients.find(client => client.id === clientId)

    if (!selectedClient) {
        return <div>Cliente no encontrado</div>
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
            <ClientDetail
                selectedClient={selectedClient}
                setView={(view) => {
                    if (view === 'list') {
                        router.push('/clients')
                    } else if (view === 'edit') {
                        router.push(`/clients/${clientId}/edit`)
                    }
                }}
            />
        </div>
    )
}