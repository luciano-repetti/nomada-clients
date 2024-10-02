'use client'

import React, { ChangeEvent } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Company, ModeView } from './types'

interface CompanyFormProps {
    isEditing: boolean
    selectedCompany?: Company
    setView: React.Dispatch<React.SetStateAction<ModeView>>
}

export const CompanyForm: React.FC<CompanyFormProps> = ({ isEditing, selectedCompany, setView }) => {
    const initialData: Partial<Company> = isEditing && selectedCompany ? {
        name: selectedCompany.name,
        email: selectedCompany.email,
        phone: selectedCompany.phone,
        address: selectedCompany.address,
        website: selectedCompany.website,
    } : {
        name: '',
        email: '',
        phone: '',
        address: '',
        website: '',
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e);
    }

    return (
        <Card className="w-full bg-gray-900 text-gray-100">
            <CardHeader>
                <div className="flex items-center">
                    <Button variant="ghost" size="icon" onClick={() => setView('list')} className="text-gray-300 hover:bg-gray-800 hover:text-white">
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <CardTitle className="text-2xl font-bold ml-2">{isEditing ? 'Edit Company' : 'Add New Company'}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                    {Object.entries(initialData).map(([key, value]) => {
                        if (key !== 'id' && key !== 'createdAt') {
                            return (
                                <div key={key}>
                                    <label htmlFor={key} className="block text-sm font-medium mb-1 text-gray-300">
                                        {key.charAt(0).toUpperCase() + key.slice(1)}
                                    </label>
                                    <Input
                                        id={key}
                                        defaultValue={value}
                                        className="bg-gray-800 text-gray-100 border-gray-700"
                                        onChange={handleChange}
                                    />
                                </div>
                            )
                        }
                        return null
                    })}
                </form>
            </CardContent>
            <CardFooter>
                <Button className="w-full bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700">
                    {isEditing ? 'Update Client' : 'Add Client'}
                </Button>
            </CardFooter>
        </Card>
    )
}
