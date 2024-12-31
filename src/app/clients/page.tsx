'use client'

import { useState, useEffect } from 'react'
import { ClientList } from '@/components/client-management/ClientList'
import { useRouter } from 'next/navigation'
import { formatClients, FormattedClient } from '@/utils/formatClient'

export default function ClientsPage() {
    const router = useRouter();
    const [clients, setClients] = useState<FormattedClient[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const token = localStorage.getItem('token_dashboard_nomada');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await fetch('/api/clients', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los clientes');
                }


                const data = await response.json();

                setClients(formatClients(data));
            } catch (error) {
                console.error('Error:', error);
                alert('Error al cargar los clientes');
            } finally {
                setIsLoading(false);
            }
        };

        fetchClients();
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
        <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
            <ClientList
                clients={filteredClients}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
        </div>
    )
}