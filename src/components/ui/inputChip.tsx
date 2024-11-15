import React, { KeyboardEvent, useState } from 'react'
import { X } from 'lucide-react'
import { cn } from "@/lib/utils"

interface InputChipProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
    values: string[]
    onChange: (values: string[]) => void
    className?: string
}

const InputChip = React.forwardRef<HTMLInputElement, InputChipProps>(
    ({ values, onChange, className, ...props }, ref) => {
        const [inputValue, setInputValue] = useState('')

        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === 'Enter' && inputValue.trim()) {
                e.preventDefault()
                if (!values.includes(inputValue.trim())) {
                    onChange([...values, inputValue.trim()])
                }
                setInputValue('')
            } else if (e.key === 'Backspace' && !inputValue && values.length > 0) {
                onChange(values.slice(0, -1))
            }
        }

        const removeChip = (index: number) => {
            const newValues = values.filter((_, i) => i !== index)
            onChange(newValues)
        }

        return (
            <div className={cn(
                "flex flex-wrap gap-2 rounded-md bg-[#1c2127] min-h-10",
                className
            )}>
                {values.map((value, index) => (
                    <span
                        key={index}
                        className="flex items-center gap-1 px-2 py-1 m-1 rounded bg-gray-700 text-gray-200 text-sm"
                    >
                        {value}
                        <button
                            type="button"
                            onClick={() => removeChip(index)}
                            className="text-gray-400 hover:text-gray-200 focus:outline-none"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </span>
                ))}
                <input
                    {...props}
                    ref={ref}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent border-none text-gray-200 focus:outline-none text-sm min-w-[120px] p-2"
                />
            </div>
        )
    }
)
InputChip.displayName = "InputChip"

export { InputChip }