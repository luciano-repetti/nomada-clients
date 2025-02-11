'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CompanyDetail } from '@/components/company-management/CompanyDetail'
import type { Company } from '@/components/company-management/types'
import { fetchAuthorization } from '@/lib/fetchClient'

export default function CompanyDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [company, setCompany] = useState<Company | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                const response = await fetchAuthorization(`/api/companies/${params.id}`);

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.message || 'Error al obtener la compañía');
                }

                const data = await response.json();

                setCompany(data);
                setError(null);
            } catch (error) {
                console.error('Error:', error);
                setError(error instanceof Error ? error.message : 'Error al cargar la compañía');
            } finally {
                setIsLoading(false);
            }
        };

        void fetchCompany();
    }, [params.id, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex items-center justify-center">
                <p>Cargando compañía...</p>
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

    if (!company) {
        return (
            <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex items-center justify-center">
                <p>Compañía no encontrada</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
            <CompanyDetail
                selectedCompany={company}
                setView={(view) => {
                    if (view === 'list') {
                        router.push('/companies')
                    } else if (view === 'edit') {
                        router.push(`/companies/${params.id}/edit`)
                    }
                }}
            />
        </div>
    )
}