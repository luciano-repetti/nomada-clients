'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { CompanyForm } from '@/components/company-management/CompanyForm'
import { Company } from '@/components/company-management/types'

const dummyCompanies: Company[] = [
    {
        id: 1,
        name: 'Tech Innovations S.A.',
        emails: ['contacto@techinnovations.com', 'soporte@techinnovations.com'],
        phones: ['+54 9 11 3000-0001', '+54 9 11 3000-0002'],
        address: 'Av. Libertador 2000, Buenos Aires, Argentina',
        created_at: '2024-09-01T20:00:00Z',
        website: 'https://www.techinnovations.com'
    },
    {
        id: 2,
        name: 'Gourmet Foods S.R.L.',
        emails: ['info@gourmetfoods.com.ar', 'ventas@gourmetfoods.com.ar'],
        phones: ['+54 9 11 4000-0002', '+54 9 11 4000-0003'],
        address: 'Calle de la Cereza 400, Mendoza, Argentina',
        created_at: '2024-08-15T10:30:00Z',
        website: 'https://www.gourmetfoods.com.ar'
    },
    {
        id: 3,
        name: 'Construcciones y Servicios S.A.',
        emails: ['servicios@construcciones.com', 'info@construcciones.com'],
        phones: ['+54 9 11 5000-0003', '+54 9 11 5000-0004'],
        address: 'Calle 5, San Juan, Argentina',
        created_at: '2024-08-15T10:30:00Z',
        website: 'https://www.construcciones.com'
    },
    {
        id: 4,
        name: 'Eco Friendly Products',
        emails: ['sales@ecofriendlyproducts.com', 'info@ecofriendlyproducts.com', 'support@ecofriendlyproducts.com'],
        phones: ['+54 9 11 6000-0004', '+54 9 11 6000-0005'],
        address: 'Av. de los Eucaliptus 100, Córdoba, Argentina',
        created_at: '2024-08-15T10:30:00Z',
        website: 'https://www.ecofriendlyproducts.com'
    },
    {
        id: 5,
        name: 'Logística Global S.R.L.',
        emails: ['contact@logisticaglobal.com', 'operations@logisticaglobal.com'],
        phones: ['+54 9 11 7000-0005', '+54 9 11 7000-0006', '+54 9 11 7000-0007'],
        address: 'Ruta 7 Km 50, Rosario, Argentina',
        created_at: '2024-09-20T08:45:00Z',
        website: 'https://www.logisticaglobal.com'
    }
]

export default function EditCompanyPage() {
    const params = useParams()

    const companyId = Number(params.id)
    const selectedCompany = dummyCompanies.find(company => company.id === companyId)

    if (!selectedCompany) {
        return <div>Compañía no encontrada</div>
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
            <CompanyForm
                isEditing={true}
                selectedCompany={selectedCompany}
            />
        </div>
    )
}