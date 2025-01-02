'use client'

import React, { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Client } from './types'
import { InputChip } from '../ui/inputChip'
import { useParams, useRouter } from 'next/navigation'
import { CompanySelect } from '../company-management/CompanySelect'

interface ClientFormProps {
    isEditing: boolean
    selectedClient?: Client
}

interface FormState {
    name: string;
    emails: string[];
    phones: string[];
    address: string;
    company?: string;
}

export const ClientForm: React.FC<ClientFormProps> = ({ isEditing, selectedClient }) => {
    const router = useRouter()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormState>(() => {
        if (isEditing && selectedClient) {
            const companyId = selectedClient.company && typeof selectedClient.company === 'object'
                ? selectedClient.company._id.toString()
                : selectedClient.company;

            return {
                name: selectedClient.name,
                emails: selectedClient.emails || [],
                phones: selectedClient.phones || [],
                address: selectedClient.address,
                company: companyId,
            }
        }
        return {
            name: '',
            emails: [],
            phones: [],
            address: '',
            company: undefined
        }
    });


    const handleBack = () => {
        if (isEditing) {
            router.push(`/clients/${params.id}`)
        } else {
            router.push('/clients')
        }
    }

    const handleChange = (field: keyof FormState, value: string | string[]) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            const token = localStorage.getItem('token_dashboard_nomada');

            if (!token) {
                router.push('/');
                return;
            }

            const clientData: Partial<Client> = {
                name: formData.name,
                emails: formData.emails,
                phones: formData.phones,
                address: formData.address,
                company: formData.company,
            };

            const response = await fetch('/api/clients', {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...clientData,
                    ...(isEditing && { id: params.id })
                })
            });

            if (!response.ok) {
                const text = await response.text();
                console.error('Error response:', text);
                throw new Error('Error al guardar el cliente');
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al guardar el cliente');
            }

            router.push('/clients');
        } catch (error) {
            alert(error instanceof Error ? error.message : 'Error al guardar el cliente');
        } finally {
            setIsLoading(false);
        }
    };


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
                        onClick={handleBack}
                        className="text-gray-300 hover:bg-zinc-800 hover:text-white"
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
                <CompanySelect
                    value={formData.company}
                    onChange={(value) => {
                        setFormData(prev => ({
                            ...prev,
                            company: value
                        }));
                    }}
                    isOptional={true}
                />
            </div>
            <div className="mt-6">
                <Button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="w-full h-10 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white rounded-md"
                >
                    {isEditing ? isLoading ? 'Updating client...' : 'Update Client' : isLoading ? 'adding client...' : 'Add Client'}
                </Button>
            </div>
        </div>
    )
}

export default ClientForm