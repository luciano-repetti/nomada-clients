'use client'

import React, { useState, useEffect } from 'react'
import { Client, ModeView } from './client-management/types'
import { ClientList } from './client-management/ClientList'
import { ClientForm } from './client-management/ClientForm'
import { ClientDetail } from './client-management/ClientDetail'

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

export const ClientManagementComponent: React.FC = () => {
  const [view, setView] = useState<ModeView>('list')
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
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