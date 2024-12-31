'use client'

import React, { useState } from 'react'
import { ChevronLeft, Edit, Trash2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Company, ModeView } from './types'
import { useRouter } from 'next/navigation'
import { ConfirmationDialog } from '../ui/confirmation-dialog'
import formatCompanyData from '@/utils/formatCompany'
import { formatDate } from '@/lib/utils'

interface CompanyDetailProps {
    selectedCompany: Company;
    setView: React.Dispatch<React.SetStateAction<ModeView>>
}

export const CompanyDetail: React.FC<CompanyDetailProps> = ({ selectedCompany, setView }) => {
    const router = useRouter();
    const [showDialog, setShowDialog] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const formattedCompany = formatCompanyData(selectedCompany);
    formattedCompany.createdAt = formatDate(formattedCompany.createdAt)
    formattedCompany.updatedAt = formatDate(formattedCompany.updatedAt)

    console.log(formattedCompany)

    const handleDelete = async () => {
        try {
            setIsDeleting(true);
            const token = localStorage.getItem('token_dashboard_nomada');

            if (!token) {
                router.push('/login');
                return;
            }

            const response = await fetch(`/api/companies/${formattedCompany.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Error al eliminar la compañía');
            }

            setShowDialog(false);
            router.push('/companies');
            router.refresh();

        } catch (error) {
            console.error('Error:', error);
            alert(error instanceof Error ? error.message : 'Error al eliminar la compañía');
        } finally {
            setIsDeleting(false);
        }
    };

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
                    <h2 className="text-xl font-semibold ml-2">Company Details</h2>
                </div>
            </div>
            <div className="space-y-4">
                <div className="bg-[#1c2127] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-4 text-gray-200">Company Information</h3>
                    {Object.entries(formattedCompany).map(([key, value]) => {
                        if (key === 'id') return null;
                        return (
                            <p key={key} className="text-gray-300">
                                <span className="font-medium text-gray-200">{key}:</span>{' '}
                                {value}
                            </p>
                        )
                    })}
                </div>
                <div className="bg-[#1c2127] p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2 text-gray-200">Associated clients</h3>
                    <p className="text-gray-300">There are no associated clients yet.</p>
                </div>
            </div>
            <div className="mt-6 flex gap-2">
                <Button
                    variant="outline"
                    onClick={() => setView('edit')}
                    className="bg-[#1c2127] border-0 text-gray-300 hover:text-white hover:bg-[#282d34]"
                >
                    <Edit className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => setShowDialog(true)}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {isDeleting ? 'Eliminating...' : 'Delete'}
                </Button>
            </div>
            <ConfirmationDialog
                isOpen={showDialog}
                onClose={() => setShowDialog(false)}
                onConfirm={handleDelete}
                title="¿Está seguro que desea eliminar?"
                description="Esta acción eliminará permanentemente la compañía y no se puede deshacer."
            />
        </div>
    )
}