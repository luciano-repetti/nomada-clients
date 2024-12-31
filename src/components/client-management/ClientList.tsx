'use client'

import React from 'react'
import { Eye, Plus, MoreHorizontal } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ClientSearch } from './ClientSearch'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'
import { FormattedClient } from '@/utils/formatClient'

interface ClientListProps {
    clients: FormattedClient[]
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const ClientList: React.FC<ClientListProps> = ({
    clients = [],
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

    return (
        <div className="w-full bg-[#12151A] text-gray-100 p-6 rounded-lg">
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Client Management</h2>
            </div>
            <div className="space-y-4">
                <div className="flex justify-between mb-4">
                    <ClientSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Link href="/clients/new">
                        <Button
                            className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700"
                        >
                            <Plus className="mr-2 h-4 w-4" /> Add Client
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
                                <TableHead className="text-gray-300">Created At</TableHead>
                                <TableHead className="text-gray-300">Updated At</TableHead>
                                <TableHead className="text-gray-300 text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow key={client.id} className="border-b border-gray-800">
                                    <TableCell className="font-medium align-top py-3">
                                        {client.name}
                                    </TableCell>
                                    <TableCell className="align-top py-3">
                                        {renderMultipleValues(client.emails)}
                                    </TableCell>
                                    <TableCell className="align-top py-3">
                                        {renderMultipleValues(client.phones)}
                                    </TableCell>
                                    <TableCell className="align-top py-3">
                                        {client.address}
                                    </TableCell>
                                    <TableCell className="align-top py-3">
                                        {formatDate(client.createdAt)}
                                    </TableCell>
                                    <TableCell className="align-top py-3">
                                        {formatDate(client.updatedAt)}
                                    </TableCell>
                                    <TableCell className="text-right align-top py-3">
                                        <Link href={`/clients/${client.id}`}>
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
        </div>
    )
}