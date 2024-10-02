'use client'

import React from 'react'
import { Eye, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClientSearch } from './ClientSearch'
import { Client, ModeView } from './types'

interface ClientListProps {
    clients: Client[]
    setView: React.Dispatch<React.SetStateAction<ModeView>>
    setSelectedClient: (client: Client) => void
    searchTerm: string
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>
}

export const ClientList: React.FC<ClientListProps> = ({ clients, setView, setSelectedClient, searchTerm, setSearchTerm }) => {
    return (
        <Card className="w-full bg-gray-900 text-gray-100">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">Client Management</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between mb-4">
                    <ClientSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <Button onClick={() => setView('add')} className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700">
                        <Plus className="mr-2 h-4 w-4" /> Add Client
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
                            <TableHead className="text-gray-300">Details</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {clients.map((client) => (
                            <TableRow key={client.id} className="border-b border-gray-800">
                                {Object.entries(client).map(([key, value]) => {
                                    if (key !== 'id') {
                                        return <TableCell key={key} className="text-gray-300">{value}</TableCell>
                                    }
                                    return null
                                })}
                                <TableCell>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => { setSelectedClient(client); setView('detail'); }}
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
