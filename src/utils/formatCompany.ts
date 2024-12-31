/* eslint-disable @typescript-eslint/no-unused-vars */
import { Company } from "@/components/company-management/types"

// Para visualización (strings)
export type CompanyWithStringArrays = Omit<Company, 'emails' | 'phones' | '_id' | '__v'> & {
    emails: string;
    phones: string;
}

// Para edición/listado (arrays)
export type FormattedCompany = Omit<Company, '__v' | '_id'>;

// Para visualización individual
export const formatCompanyData = (company: Company): CompanyWithStringArrays => {
    const {_id, __v, ...companyRemaining} = company

    return {
        ...companyRemaining,
        id: _id,
        emails: Array.isArray(company.emails) ? company.emails.join(", ") : company.emails,
        phones: Array.isArray(company.phones) ? company.phones.join(", ") : company.phones,
    }
}

// Para listados y edición
export const formatCompanies = (companies: Company[]): FormattedCompany[] => {
    return companies.map(({ _id, __v, ...company }) => ({
        ...company,
        id: _id
    }));
}

export default formatCompanyData