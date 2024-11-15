'use client'

import React, { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Client, ModeView } from './types'
import { InputChip } from '../ui/inputChip'

interface ClientFormProps {
    isEditing: boolean
    selectedClient?: Client
    setView: React.Dispatch<React.SetStateAction<ModeView>>
}

interface FormState {
    name: string;
    emails: string[];
    phones: string[];
    address: string;
}

export const ClientForm: React.FC<ClientFormProps> = ({ isEditing, selectedClient, setView }) => {
    const [formData, setFormData] = useState<FormState>(() => {
        if (isEditing && selectedClient) {
            return {
                name: selectedClient.name,
                emails: selectedClient.emails || [], // Ya no necesitamos split
                phones: selectedClient.phones || [], // Ya no necesitamos split
                address: selectedClient.address,
            }
        }
        return {
            name: '',
            emails: [],
            phones: [],
            address: '',
        }
    })

    const handleChange = (field: keyof FormState, value: string | string[]) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = () => {
        const clientData: Partial<Client> = {
            name: formData.name,
            emails: formData.emails, // Ya no necesitamos join
            phones: formData.phones, // Ya no necesitamos join
            address: formData.address,
        }
        console.log(clientData)
    }

    const renderChipField = (field: 'emails' | 'phones') => {
        const label = field === 'emails' ? 'Email' : 'Phone'
        return (
            <div className="space-y-2">
                <label className="block text-sm text-gray-300">
                    {label}s
                </label>
                <InputChip
                    values={formData[field]}
                    onChange={(values) => handleChange(field, values)}
                    placeholder={`Type ${label.toLowerCase()} and press Enter`}
                />
            </div>
        )
    }

    return (
        <div className="w-full bg-[#12151A] text-gray-100 p-6 rounded-lg">
            <div className="mb-6">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setView('list')}
                        className="text-gray-300 hover:text-white hover:bg-transparent"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold ml-2">
                        {isEditing ? 'Edit Client' : 'Add New Client'}
                    </h2>
                </div>
            </div>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm text-gray-300 mb-2">
                        Name
                    </label>
                    <Input
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                </div>

                {renderChipField('emails')}
                {renderChipField('phones')}

                <div>
                    <label className="block text-sm text-gray-300 mb-2">
                        Address
                    </label>
                    <Input
                        value={formData.address}
                        onChange={(e) => handleChange('address', e.target.value)}
                    />
                </div>
            </div>
            <div className="mt-6">
                <Button
                    onClick={handleSubmit}
                    className="w-full h-10 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white rounded-md"
                >
                    {isEditing ? 'Update Client' : 'Add Client'}
                </Button>
            </div>
        </div>
    )
}

export default ClientForm