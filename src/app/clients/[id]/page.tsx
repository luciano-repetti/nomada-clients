'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ClientDetail } from '@/components/client-management/ClientDetail'
import { Client } from '@/components/client-management/types'

export default function ClientDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [client, setClient] = useState<Client | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const token = localStorage.getItem('token_dashboard_nomada');
                if (!token) {
                    router.push('/login');
                    return;
                }

                const response = await fetch(`/api/clients/${params.id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Error al obtener el cliente');
                }

                const data = await response.json();

                setClient(data);
                setError(null);
            } catch (error) {
                console.error('Error:', error);
                setError(error instanceof Error ? error.message : 'Error al cargar el cliente');
            } finally {
                setIsLoading(false);
            }
        };

        fetchClient();
    }, [params.id, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex items-center justify-center">
                <p>Cargando cliente...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex items-center justify-center">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!client) {
        return (
            <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex items-center justify-center">
                <p>Cliente no encontrado</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
            <ClientDetail
                selectedClient={client}
                setView={(view) => {
                    if (view === 'list') {
                        router.push('/clients')
                    } else if (view === 'edit') {
                        router.push(`/clients/${params.id}/edit`)
                    }
                }}
            />
        </div>
    )
}