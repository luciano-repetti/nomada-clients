'use client'

import { useState, useEffect } from 'react'
import { CompanyList } from '@/components/company-management/CompanyList'
import { useRouter } from 'next/navigation'
import { formatCompanies, FormattedCompany } from '@/utils/formatCompany'
import { fetchAuthorization } from '@/lib/fetchClient'

export default function CompaniesPage() {
    const router = useRouter();
    const [companies, setCompanies] = useState<FormattedCompany[]>([])
    const [searchTerm, setSearchTerm] = useState<string>('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetchAuthorization('/api/companies');

                if (!response.ok) {
                    throw new Error('Error al obtener las compañías');
                }

                const data = await response.json();

                setCompanies(formatCompanies(data));
            } catch (error) {
                console.error('Error:', error);
                alert('Error al cargar las compañías');
            } finally {
                setIsLoading(false);
            }
        };

        fetchCompanies();
    }, [router]);

    const filteredCompanies = companies.filter(company =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        company.emails.some(email => email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        company.phones.some(phone => phone.toLowerCase().includes(searchTerm.toLowerCase())) ||
        company.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (company.website && company.website.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-950 text-gray-100 p-8 flex items-center justify-center">
                <p>Cargando compañías...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
            <CompanyList
                companies={filteredCompanies}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
        </div>
    )
}