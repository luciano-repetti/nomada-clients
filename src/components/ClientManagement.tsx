'use client'

import React, { useState, useEffect } from 'react'
import { Client, ModeView } from './client-management/types'
import { ClientList } from './client-management/ClientList'
import { ClientForm } from './client-management/ClientForm'
import { ClientDetail } from './client-management/ClientDetail'

const dummyClients: Client[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', address: '123 Main St', created_at: '2024-08-15T10:30:00Z', },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', address: '456 Elm St', created_at: '2024-08-15T10:30:00Z' },
  { id: 3, name: 'Alice Johnson', email: 'alice@example.com', phone: '555-123-4567', address: '789 Oak Ave', created_at: '2024-08-15T10:30:00Z' },
  { id: 4, name: 'Bob Williams', email: 'bob@example.com', phone: '777-888-9999', address: '321 Pine Rd', created_at: '2024-08-15T10:30:00Z' },
]

export const ClientManagementComponent: React.FC = () => {
  const [view, setView] = useState<ModeView>('list')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [clients, setClients] = useState<Client[]>(dummyClients)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const filteredClients = dummyClients.filter(client =>
      Object.values(client).some(value =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    setClients(filteredClients)
  }, [searchTerm])

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client)
    setView('detail')
  }

  const renderView = () => {
    switch (view) {
      case 'list':
        return (
          <ClientList
            clients={clients}
            setView={setView}
            setSelectedClient={handleSelectClient}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )
      case 'detail':
        return selectedClient ? (
          <ClientDetail
            selectedClient={selectedClient}
            setView={setView}
          />
        ) : null
      case 'add':
        return (
          <ClientForm
            isEditing={false}
            setView={setView}
          />
        )
      case 'edit':
        return selectedClient ? (
          <ClientForm
            isEditing={true}
            selectedClient={selectedClient}
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
