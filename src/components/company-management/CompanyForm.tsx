'use client'

import React, { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Company } from './types'
import { InputChip } from '../ui/inputChip'
import { useParams, useRouter } from 'next/navigation'

interface CompanyFormProps {
    isEditing: boolean
    selectedCompany?: Company
}

interface FormState {
    name: string;
    emails: string[];
    phones: string[];
    address: string;
    website: string;
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ isEditing, selectedCompany }) => {
    const router = useRouter()
    const params = useParams()

    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState<FormState>(() => {
        if (isEditing && selectedCompany) {
            return {
                name: selectedCompany.name,
                emails: selectedCompany.emails || [],
                phones: selectedCompany.phones || [],
                address: selectedCompany.address,
                website: selectedCompany.website,
            }
        }
        return {
            name: '',
            emails: [],
            phones: [],
            address: '',
            website: '',
        }
    })

    const handleBack = () => {
        if (isEditing) {
            router.push(`/companies/${params.id}`)
        } else {
            router.push('/companies')
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
                router.push('/login');
                return;
            }

            const companyData: Partial<Company> = {
                name: formData.name,
                emails: formData.emails,
                phones: formData.phones,
                address: formData.address,
                website: formData.website,
            };

            const response = await fetch('/api/companies', {
                method: isEditing ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...companyData,
                    ...(isEditing && { id: params.id })
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al guardar la compañía');
            }

            router.push('/companies');
            router.refresh();

        } catch (error) {
            console.error('Error:', error);
            alert(error instanceof Error ? error.message : 'Error al guardar la compañía');
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
                        {isEditing ? 'Edit Company' : 'Add New Company'}
                    </h2>
                </div>
            </div>
            <div className="space-y-4">
                <form className="space-y-4">
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

                    <div>
                        <label className="block text-sm text-gray-300 mb-2">
                            Website
                        </label>
                        <Input
                            value={formData.website}
                            onChange={(e) => handleChange('website', e.target.value)}
                        />
                    </div>
                </form>
            </div>
            <div className="mt-6">
                <Button
                    onClick={handleSubmit}
                    className="w-full h-10 bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                >
                    {isEditing ? isLoading ? 'Updating Company...' : 'Update Company' : isLoading ? 'adding Company...' : 'Add Company'}
                </Button>
            </div>
        </div>
    )
}