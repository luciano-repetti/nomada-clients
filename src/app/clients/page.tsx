'use client'

import { useState, useEffect } from 'react'
import { ClientList } from '@/components/client-management/ClientList'
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

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>(dummyClients)
    const [searchTerm, setSearchTerm] = useState<string>('')

    useEffect(() => {
        const filteredClients = dummyClients.filter(client =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.emails.some(email => email.toLowerCase().includes(searchTerm.toLowerCase())) ||
            client.phones.some(phone => phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
            client.address.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setClients(filteredClients)
    }, [searchTerm])

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
            <ClientList
                clients={clients}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
        </div>
    )
}