import { Client } from "@/components/client-management/types"

export type ClientWithStringArrays = Omit<Client, 'emails' | 'phones'> & {
    emails: string[] | string;
    phones: string[] | string;
}

const formatClientData = (client: Client): ClientWithStringArrays => {
    return {
        ...client,
        emails: Array.isArray(client.emails) ? client.emails.join(", ") : client.emails,
        phones: Array.isArray(client.phones) ? client.phones.join(", ") : client.phones,
    }
}

export default formatClientData