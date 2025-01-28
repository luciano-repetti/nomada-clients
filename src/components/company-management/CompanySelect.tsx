import { useEffect, useState } from "react";
import type { Option } from "../ui/input-list";
import { StyledCustomSelect } from "../ui/input-list";
import type { Company } from "./types";
import { fetchAuthorization } from "@/lib/fetchClient";

export const CompanySelect: React.FC<{
    value?: string;
    onChange: (value: string) => void;
    isOptional?: boolean;
}> = ({ value, onChange, isOptional = false }) => {
    const [companies, setCompanies] = useState<Option[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>()

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                const response = await fetchAuthorization('/api/companies');

                if (!response.ok) {
                    throw new Error('Error al cargar las compañías');
                }

                const data = await response.json();
                const formattedCompanies = data.map((company: Company) => ({
                    id: company._id,
                    label: company.name
                }));

                setCompanies(formattedCompanies);
                setError(undefined);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Error al cargar las compañías');
            } finally {
                setIsLoading(false);
            }
        };

        void fetchCompanies();
    }, []);

    return (
        <StyledCustomSelect
            options={companies}
            value={value}
            onChange={onChange}
            label="Company"
            placeholder="Search company..."
            isOptional={isOptional}
            isLoading={isLoading}
            error={error}
        />
    );
};