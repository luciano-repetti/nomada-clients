'use client'

import React, { useState, useEffect } from 'react'
import { Company, ModeView } from './company-management/types'
import { CompanyList } from './company-management/CompanyList'
import { CompanyDetail } from './company-management/CompanyDetail'
import { CompanyForm } from './company-management/CompanyForm'

const dummyCompanies: Company[] = [
  {
    id: 1,
    name: 'Tech Innovations S.A.',
    email: 'contacto@techinnovations.com',
    phone: '+54 9 11 3000-0001',
    address: 'Av. Libertador 2000, Buenos Aires, Argentina',
    created_at: '2024-09-01T20:00:00Z',
    website: 'https://www.techinnovations.com'
  },
  {
    id: 2,
    name: 'Gourmet Foods S.R.L.',
    email: 'info@gourmetfoods.com.ar',
    phone: '+54 9 11 4000-0002',
    address: 'Calle de la Cereza 400, Mendoza, Argentina',
    created_at: '2024-08-15T10:30:00Z',
    website: 'https://www.gourmetfoods.com.ar'
  },
  {
    id: 3,
    name: 'Construcciones y Servicios S.A.',
    email: 'servicios@construcciones.com',
    phone: '+54 9 11 5000-0003',
    address: 'Calle 5, San Juan, Argentina',
    created_at: '2024-08-15T10:30:00Z',
    website: 'https://www.construcciones.com'
  },
  {
    id: 4,
    name: 'Eco Friendly Products',
    email: 'sales@ecofriendlyproducts.com',
    phone: '+54 9 11 6000-0004',
    address: 'Av. de los Eucaliptus 100, Córdoba, Argentina',
    created_at: '2024-08-15T10:30:00Z',
    website: 'https://www.ecofriendlyproducts.com'
  },
  {
    id: 5,
    name: 'Logística Global S.R.L.',
    email: 'contact@logisticaglobal.com',
    phone: '+54 9 11 7000-0005',
    address: 'Ruta 7 Km 50, Rosario, Argentina',
    created_at: '2024-09-20T08:45:00Z',
    website: 'https://www.logisticaglobal.com'
  }
]

export const CompanyManagement: React.FC = () => {
  const [view, setView] = useState<ModeView>('list')
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null)
  const [companies, setCompanies] = useState<Company[]>(dummyCompanies)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const filteredClients = dummyCompanies.filter(company =>
      Object.values(company).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    setCompanies(filteredClients)
  }, [searchTerm])

  const handleSelectClient = (company: Company) => {
    setSelectedCompany(company)
    setView('detail')
  }

  const renderView = () => {
    switch (view) {
      case 'list':
        return (
          <CompanyList
            companies={companies}
            setView={setView}
            setSelectedCompany={handleSelectClient}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )
      case 'detail':
        return selectedCompany ? (
          <CompanyDetail
            selectedCompany={selectedCompany}
            setView={setView}
          />
        ) : null
      case 'add':
        return (
          <CompanyForm
            isEditing={false}
            setView={setView}
          />
        )
      case 'edit':
        return selectedCompany ? (
          <CompanyForm
            isEditing={true}
            selectedCompany={selectedCompany}
            setView={setView}
          />
        ) : null
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
      {renderView()}
    </div>
  )
}
