/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from "@/components/client-management/types"
import { formatDate } from "@/lib/utils";

// Para visualización (strings)
export type ClientWithStringArrays = Omit<Client, 'emails' | 'phones' | '_id' | '__v' | 'company'> & {
   emails: string;
   phones: string;
   companyName?: string; // Opcional ya que la compañía es opcional
}

export type ClientDetails = Omit<ClientWithStringArrays, 'createdAt' | 'updatedAt'> & {
    "Company name"?: string;
    Creation: string;
    Updated: string;
}

// Para edición/listado (arrays)
export type FormattedClient = Omit<Client, '__v' | '_id'>;

// Para visualización individual
// export const formatClientData = (client: Client): ClientWithStringArrays => {
//    const {_id, __v, ...clientRemaining} = client

//    return {
//        ...clientRemaining,
//        id: _id,
//        emails: Array.isArray(client.emails) ? client.emails.join(", ") : client.emails,
//        phones: Array.isArray(client.phones) ? client.phones.join(", ") : client.phones,
//    }
// }

export const formatClientDetails = (client: Client) : ClientDetails => {
    const {_id, __v, company, createdAt, updatedAt, ...clientRemaining} = client

    let companyName: string | undefined = undefined;
    if (typeof company === 'object' && company && '_id' in company && 'name' in company) {
        companyName = company.name;
    }

    return {
        ...clientRemaining,
        id: _id,
        emails: Array.isArray(client.emails) ? client.emails.join(", ") : client.emails,
        phones: Array.isArray(client.phones) ? client.phones.join(", ") : client.phones,
        "Company name": companyName,
        Creation: formatDate(createdAt),
        Updated: formatDate(updatedAt),
    }
}

// Para listados y edición
export const formatClients = (clients: Client[]): FormattedClient[] => {
   return clients.map(({ _id, __v, ...client }) => ({
       ...client,
       id: _id
   }));
}