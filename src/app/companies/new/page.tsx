'use client'

import React from 'react'
import { CompanyForm } from '@/components/company-management/CompanyForm'

export default function AddCompanyPage() {

    return (
        <div className="min-h-screen bg-gray-950 text-gray-100 p-8">
            <CompanyForm
                isEditing={false}
            />
        </div>
    )
}