'use client'

import React from 'react'
import { Eye, Plus, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CompanySearch } from './CompanySearch'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import type { FormattedCompany } from '@/utils/formatCompany'

interface CompanyListProps {
    companies: FormattedCompany[]
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const CompanyList: React.FC<CompanyListProps> = ({
    companies = [],
    searchTerm,
    setSearchTerm
}) => {
    const renderMultipleValues = (values: string[] | undefined) => {
        if (!values || !Array.isArray(values)) return null;

        const MAX_VISIBLE = 1;
        const visibleValues = values.slice(0, MAX_VISIBLE);
        const remainingCount = values.length - MAX_VISIBLE;

        return (
            <div className="flex flex-col gap-0.5">
                {visibleValues.map((value, index) => (
                    <span
                        key={index}
                        className="text-sm text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis"
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

    return (
        <div className="w-full bg-[#12151A] text-gray-100 p-6 rounded-lg">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Company Management</h2>
            </div>
            <div className="flex justify-between mb-4">
                <CompanySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <Link href="/companies/new">
                    <Button
                        className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                    >
                        <Plus className="mr-2 h-4 w-4" /> Add Company
                    </Button>
                </Link>
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
                            <TableHead className="text-gray-300">Updated At</TableHead>
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
                                    {formatDate(company.createdAt)}
                                </TableCell>
                                <TableCell className="align-top py-3">
                                    {formatDate(company.updatedAt)}
                                </TableCell>
                                <TableCell className="text-right align-top py-3">
                                    <Link href={`/companies/${company.id}`}>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-gray-400 hover:text-slate-950"
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}