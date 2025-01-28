'use client'

import React from 'react'
import type { ChangeEvent } from 'react'
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

interface ClientSearchProps {
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const ClientSearch: React.FC<ClientSearchProps> = ({ searchTerm, setSearchTerm }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <Input
                placeholder="Search clients"
                className="pl-8"
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    )
}
