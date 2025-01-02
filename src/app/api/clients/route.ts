import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import Client from '@/models/Client';
import { isValidObjectId } from 'mongoose';
import { headers } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET!;

interface JWTPayload {
    id: string;
    email: string;
    role: string;
}

// Middleware para verificar token y rol
const validateTokenAndRole = async (request: Request): Promise<JWTPayload> => {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Token no proporcionado');
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = verify(token, JWT_SECRET) as JWTPayload;
        
        if (decoded.role !== 'admin') {
            throw new Error('No tienes permisos para realizar esta acción');
        }

        return decoded;
    } catch (err) {
        console.error(err)
        throw new Error('Token inválido');
    }
};

export async function POST(request: Request) {
    try {
        // Validar token y rol
        await validateTokenAndRole(request);

        // Conectar a la base de datos
        await dbConnect();

        // Obtener datos del body
        const body = await request.json();
        const { name, emails, phones, address, position, company } = body;

        // Validaciones básicas
        if (!name || !emails.length || !phones.length || !address) {
            return NextResponse.json(
                { message: 'Todos los campos son requeridos' },
                { status: 400 }
            );
        }

        // Crear nuevo cliente
        const client = await Client.create({
            name,
            emails,
            phones,
            address,
            position,
            company
        });

        return NextResponse.json(client, { status: 201 });

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Error en el servidor' },
            { status: 401 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        // Validar token y rol
        await validateTokenAndRole(request);

        // Conectar a la base de datos
        await dbConnect();

        // Obtener datos del body
        const body = await request.json();
        const { id, name, emails, phones, position, address, company } = body;

        // Validar ID
        if (!id || !isValidObjectId(id)) {
            return NextResponse.json(
                { message: 'ID de cliente inválido' },
                { status: 400 }
            );
        }

        // Validaciones básicas
        if (!name || !emails.length || !phones.length || !address || !position) {
            return NextResponse.json(
                { message: 'Todos los campos son requeridos' },
                { status: 400 }
            );
        }

        // Actualizar cliente
        const updatedClient = await Client.findByIdAndUpdate(
            id,
            {
                name,
                emails,
                phones,
                position,
                address,
                company: company ? company : null
            },
            { new: true }
        );

        if (!updatedClient) {
            return NextResponse.json(
                { message: 'Cliente no encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedClient);

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : 'Error en el servidor' },
            { status: 401 }
        );
    }
}

export async function GET() {
    try {
        const headersList = headers();
        const token = headersList.get('Authorization')?.split(' ')[1];

        if (!token) {
            return NextResponse.json(
                { message: 'No autorizado' },
                { status: 401 }
            );
        }

        // Conectar a la base de datos
        await dbConnect();

        // Obtener todos los clientes
        const clients = await Client.find({})
            .sort({ createdAt: -1 });

        return NextResponse.json(clients);

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: 'Error al obtener los clientes' },
            { status: 500 }
        );
    }
}

