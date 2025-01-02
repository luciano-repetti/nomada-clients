import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Client from '@/models/Client';
import { isValidObjectId } from 'mongoose';
import Company from '@/models/Company';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
 ) {
    try {
        await dbConnect();
 
        const { id } = params;
 
        if (!isValidObjectId(id)) {
            return NextResponse.json(
                { message: 'ID de cliente inválido' },
                { status: 400 }
            );
        }
 
        // Encuentra el cliente
        const client = await Client.findById(id);
 
        if (!client) {
            return NextResponse.json(
                { message: 'Cliente no encontrado' },
                { status: 404 }
            );
        }
 
        const clientObj = client.toObject();
 
        // Si el cliente tiene una compañía asociada, obtener sus datos
        if (clientObj.company) {
            const company = await Company.findById(clientObj.company);
            return NextResponse.json({
                ...clientObj,
                company: company ? {
                    _id: company._id,
                    name: company.name
                } : null
            });
        }
 
        return NextResponse.json(clientObj);
 
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { message: 'Error al obtener el cliente' },
            { status: 500 }
        );
    }
} 

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const client = await Client.findByIdAndDelete(params.id);
        
        if (!client) {
            return NextResponse.json(
                { message: 'Cliente no encontrado' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Cliente eliminado exitosamente' });
    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: 'Error al eliminar el cliente' },
            { status: 500 }
        );
    }
}
