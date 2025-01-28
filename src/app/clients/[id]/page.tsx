'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ClientDetail } from '@/components/client-management/ClientDetail'
import type { Client } from '@/components/client-management/types'
import { fetchAuthorization } from '@/lib/fetchClient'

export default function ClientDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [client, setClient] = useState<Client | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await fetchAuthorization(`/api/clients/${params.id}`);

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

        void fetchClient();
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