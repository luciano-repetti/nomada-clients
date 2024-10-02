'use client'

import React from 'react'
import { Eye, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Company, ModeView } from './types'
import { CompanySearch } from './CompanySearch'
import { formatDate } from '@/lib/utils'

interface CompanyListProps {
    companies: Company[]
    setView: React.Dispatch<React.SetStateAction<ModeView>>
    setSelectedCompany: (company: Company) => void
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const CompanyList: React.FC<CompanyListProps> = ({ companies, setView, setSelectedCompany, searchTerm, setSearchTerm }) => {
    return (
        <Card className="w-full bg-gray-900 text-gray-100">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Company Management</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between mb-4">
                    <CompanySearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Button onClick={() => setView('add')} className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700">
                        <Plus className="mr-2 h-4 w-4" /> Add Company
                    </Button>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-gray-700">
                            <TableHead className="text-gray-300">Name</TableHead>
                            <TableHead className="text-gray-300">Email</TableHead>
                            <TableHead className="text-gray-300">Phone</TableHead>
                            <TableHead className="text-gray-300">Address</TableHead>
                            <TableHead className="text-gray-300">Created At</TableHead>
                            <TableHead className="text-gray-300">Website</TableHead>
                            <TableHead className="text-gray-300">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {companies.map((company) => (
                            <TableRow key={company.id} className="border-b border-gray-800">
                                {Object.entries(company).map(([key, value]) => {
                                    const valueCell = key === 'created_at' ? formatDate(value) : value

                                    if (key !== 'id') {
                                        return <TableCell key={key} className="text-gray-300">{valueCell}</TableCell>
                                    }
                                    return null
                                })}
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => { setSelectedCompany(company); setView('detail'); }}
                                        className="text-gray-400 w-fit h-full px-2 hover:bg-transparent hover:text-white"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
