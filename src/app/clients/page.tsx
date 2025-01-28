'use client'

import { useState, useEffect } from 'react'
import { ClientList } from '@/components/client-management/ClientList'
import { useRouter } from 'next/navigation'
import type { FormattedClient } from '@/utils/formatClient'
import { formatClients } from '@/utils/formatClient'
import { fetchAuthorization } from '@/lib/fetchClient'

export default function ClientsPage() {
    const router = useRouter();
    const [clients, setClients] = useState<FormattedClient[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        void (async () => {
            try {
                const response = await fetchAuthorization('/api/clients');

                if (!response.ok) {
                    throw new Error('Error al obtener los clientes');
                }

                const data = await response.json();
                setClients(formatClients(data));
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        })();
    }, [router]);

    const filteredClients = clients.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.emails.some(email => email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        client.phones.some(phone => phone.includes(searchTerm.toLowerCase())) ||
        client.address.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex items-center justify-center">
                <p>Cargando clientes...</p>
            </div>
        );
    }

    return (
        <div className="max-h-svh text-gray-100 p-8">
            <ClientList
                clients={filteredClients}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
        </div>
    )
}