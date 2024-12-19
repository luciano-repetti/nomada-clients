'use client'

import React from 'react'
import { ClientForm } from '@/components/client-management/ClientForm'

export default function AddClientPage() {
    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
            <ClientForm
                isEditing={false}
            />
        </div>
    )
}