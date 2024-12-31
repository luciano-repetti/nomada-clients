/* eslint-disable @typescript-eslint/no-unused-vars */
import { Client } from "@/components/client-management/types"

// Para visualización (strings)
export type ClientWithStringArrays = Omit<Client, 'emails' | 'phones' | '_id' | '__v'> & {
    emails: string;
    phones: string;
}

// Para edición/listado (arrays)
export type FormattedClient = Omit<Client, '__v' | '_id'>;

// Para visualización individual
export const formatClientData = (client: Client): ClientWithStringArrays => {
    const {_id, __v, ...clientRemaining} = client

    return {
        ...clientRemaining,
        id: _id,
        emails: Array.isArray(client.emails) ? client.emails.join(", ") : client.emails,
        phones: Array.isArray(client.phones) ? client.phones.join(", ") : client.phones,
    }
}

// Para listados y edición
export const formatClients = (clients: Client[]): FormattedClient[] => {
    return clients.map(({ _id, __v, ...client }) => ({
        ...client,
        id: _id
    }));
}

export default formatClientData