import { NextResponse } from 'next/server';
import { verify } from 'jsonwebtoken';
import dbConnect from '@/lib/mongodb';
import { isValidObjectId } from 'mongoose';
import Company from '@/models/Company';

const JWT_SECRET = process.env.JWT_SECRET!;

interface JWTPayload {
    id: string;
    email: string;
    role: string;
}

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
    } catch (error) {
        console.error(error)
        throw new Error('Token inválido');
    }
};

export async function POST(request: Request) {
    try {
        await validateTokenAndRole(request);
        await dbConnect();

        const body = await request.json();
        const { name, emails, phones, address, website } = body;

        if (!name || !emails.length || !phones.length || !address) {
            return NextResponse.json(
                { message: 'Todos los campos son requeridos excepto website' },
                { status: 400 }
            );
        }

        const company = await Company.create({
            name,
            emails,
            phones,
            address,
            website
        });

        return NextResponse.json(company, { status: 201 });

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
        await validateTokenAndRole(request);
        await dbConnect();

        const body = await request.json();
        const { id, name, emails, phones, address, website } = body;

        if (!id || !isValidObjectId(id)) {
            return NextResponse.json(
                { message: 'ID de compañía inválido' },
                { status: 400 }
            );
        }

        if (!name || !emails.length || !phones.length || !address) {
            return NextResponse.json(
                { message: 'Todos los campos son requeridos excepto website' },
                { status: 400 }
            );
        }

        const updatedCompany = await Company.findByIdAndUpdate(
            id,
            {
                name,
                emails,
                phones,
                address,
                website
            },
            { new: true }
        );

        if (!updatedCompany) {
            return NextResponse.json(
                { message: 'Compañía no encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json(updatedCompany);

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
        await dbConnect();

        const companies = await Company.find({})
            .sort({ createdAt: -1 });

        return NextResponse.json(companies);

    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: 'Error al obtener las compañías' },
            { status: 500 }
        );
    }
}
