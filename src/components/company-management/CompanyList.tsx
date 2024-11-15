'use client'

import React from 'react'
import { Eye, Plus, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CompanySearch } from './CompanySearch'
import { Company, ModeView } from './types'
import { formatDate } from '@/lib/utils'

interface CompanyListProps {
    companies: Company[]
    setView: React.Dispatch<React.SetStateAction<ModeView>>
    setSelectedCompany: (company: Company) => void
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const CompanyList: React.FC<CompanyListProps> = ({
    companies = [],
    setView,
    setSelectedCompany,
    searchTerm,
    setSearchTerm
}) => {
    const renderMultipleValues = (values: string[] | undefined) => {
        if (!values || !Array.isArray(values)) return null;

        const MAX_VISIBLE = 3;
        const visibleValues = values.slice(0, MAX_VISIBLE);
        const remainingCount = values.length - MAX_VISIBLE;

        return (
            <div className="flex flex-col gap-0.5">
                {visibleValues.map((value, index) => (
                    <span
                        key={index}
                        className="text-sm text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis"
                        style={{ maxWidth: '200px' }}
                    >
                        {value}
                    </span>
                ))}
                {remainingCount > 0 && (
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                        <MoreHorizontal className="h-3 w-3" />
                        {remainingCount} more
                    </span>
                )}
            </div>
        )
    }

    if (!companies || companies.length === 0) {
        return (
            <div className="w-full bg-[#12151A] text-gray-100 p-6 rounded-lg">
                <div className="mb-6">
                    <h2 className="text-xl font-semibold">Company Management</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex justify-between mb-4">
                        <CompanySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <Button
                            onClick={() => setView('add')}
                            className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Company
                        </Button>
                    </div>
                    <div className="text-center py-8 text-gray-400">
                        No companies found
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-[#12151A] text-gray-100 p-6 rounded-lg">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Company Management</h2>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between">
                    <CompanySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Button
                        onClick={() => setView('add')}
                        className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Company
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-b border-gray-700">
                                <TableHead className="text-gray-300">Name</TableHead>
                                <TableHead className="text-gray-300">Email</TableHead>
                                <TableHead className="text-gray-300">Phone</TableHead>
                                <TableHead className="text-gray-300">Address</TableHead>
                                <TableHead className="text-gray-300">Website</TableHead>
                                <TableHead className="text-gray-300">Created At</TableHead>
                                <TableHead className="text-gray-300 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {companies.map((company) => (
                                <TableRow key={company.id} className="border-b border-gray-800">
                                    <TableCell className="font-medium align-top py-3">
                                        {company.name}
                                    </TableCell>
                                    <TableCell className="align-top py-3">
                                        {renderMultipleValues(company.emails)}
                                    </TableCell>
                                    <TableCell className="align-top py-3">
                                        {renderMultipleValues(company.phones)}
                                    </TableCell>
                                    <TableCell className="align-top py-3">
                                        {company.address}
                                    </TableCell>
                                    <TableCell className="align-top py-3">
                                        {company.website}
                                    </TableCell>
                                    <TableCell className="align-top py-3">
                                        {formatDate(company.created_at)}
                                    </TableCell>
                                    <TableCell className="text-right align-top py-3">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => {
                                                setSelectedCompany(company);
                                                setView('detail');
                                            }}
                                            className="text-gray-400 hover:text-slate-950"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}