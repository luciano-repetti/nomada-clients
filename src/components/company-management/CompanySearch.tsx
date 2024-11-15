'use client'

import React, { ChangeEvent } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

interface CompanySearchProps {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const CompanySearch: React.FC<CompanySearchProps> = ({ searchTerm, setSearchTerm }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
                placeholder="Search companies"
                className="pl-8"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    )
}
