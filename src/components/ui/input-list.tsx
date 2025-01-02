'use client'
import React, { useState, useEffect } from 'react'

export interface Option {
    id: string;
    label: string;
}

interface StyledCustomSelectProps {
    options: Option[];
    value?: string;
    onChange: (value: string) => void;
    label: string;
    placeholder?: string;
    isOptional?: boolean;
    isLoading?: boolean;
    error?: string;
}

export const StyledCustomSelect: React.FC<StyledCustomSelectProps> = ({
    options,
    value,
    onChange,
    label,
    placeholder = "Escribe o selecciona una opción",
    isOptional = false,
    isLoading = false,
    error
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    // Actualizar searchTerm cuando cambia el valor seleccionado
    useEffect(() => {
        const selectedOption = options.find(opt => opt.id === value);
        setSearchTerm(selectedOption?.label || '');
    }, [value, options]);

    const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full">
            <label className="block text-sm text-gray-300 mb-2">
                {label} {isOptional && <span className="text-gray-400">(optional)</span>}
            </label>
            <div className="relative">
                <input
                    className="flex h-10 w-full rounded-md bg-[#1c2127] text-gray-200 px-3 py-2 text-sm border-0 focus:ring-0 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    onBlur={() => setTimeout(() => setIsOpen(false), 200)}
                    disabled={isLoading}
                />
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-[#1c2127] rounded-md shadow-lg max-h-60 overflow-auto">
                        {isOptional && (
                            <div
                                className="px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
                                onMouseDown={() => {
                                    onChange('');
                                    setSearchTerm('');
                                }}
                            >
                                No seleccionar
                            </div>
                        )}
                        {filteredOptions.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-gray-400">
                                No se encontraron opciones
                            </div>
                        ) : (
                            filteredOptions.map((option) => (
                                <div
                                    key={option.id}
                                    className="px-3 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
                                    onMouseDown={() => {
                                        onChange(option.id);
                                        setSearchTerm(option.label);
                                    }}
                                >
                                    {option.label}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
            {error && (
                <p className="mt-1 text-sm text-red-500">{error}</p>
            )}
        </div>
    )
}