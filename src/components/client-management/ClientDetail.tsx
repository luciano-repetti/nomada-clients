'use client'

import React from 'react'
import { ChevronLeft, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Client, ModeView } from './types'
import formatClientData from '@/utils/formatClient'
import { formatDate } from '@/utils/formatDate'

interface ClientDetailProps {
    selectedClient: Client;
    setView: React.Dispatch<React.SetStateAction<ModeView>>
}

export const ClientDetail: React.FC<ClientDetailProps> = ({ selectedClient, setView }) => {
    const formattedClient = formatClientData(selectedClient);
    formattedClient.created_at = formatDate(formattedClient.created_at)

    return (
        <div className="w-full bg-[#12151A] text-gray-100 p-6 rounded-lg">
            <div className="mb-6">
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setView('list')}
                        className="text-gray-300 hover:text-white hover:bg-zinc-800"
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <h2 className="text-xl font-semibold ml-2">Client Details</h2>
                </div>
            </div>
            <div className="space-y-4">
                <div className="space-y-6">
                    <div className="bg-[#1c2127] p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 text-gray-200">Personal Information</h3>
                        {Object.entries(formattedClient).map(([key, value]) => {
                            if (key !== 'id') {
                                return (
                                    <p key={key} className="text-gray-300">
                                        <span className="font-medium text-gray-200">{key.charAt(0).toUpperCase() + key.slice(1)}:</span> {value}
                                    </p>
                                )
                            }
                            return null
                        })}
                    </div>
                    <div className="bg-[#1c2127] p-4 rounded-lg">
                        <h3 className="text-lg font-semibold mb-2 text-gray-200">Proposals and Quotations</h3>
                        <p className="text-gray-300">No proposals or quotations yet.</p>
                    </div>
                </div>
            </div>
            <div className="mt-6 flex gap-2">
                <Button
                    variant="outline"
                    className="mr-2 bg-gray-700 border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white"
                    onClick={() => setView('edit')}
                >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                >
                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
            </div>
        </div>
    )
}