import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Company from '@/models/Company';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect();
        const company = await Company.findById(params.id);
        
        if (!company) {
            return NextResponse.json(
                { message: 'Compañía no encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json(company);

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: 'Error al obtener la compañía' },
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
        const company = await Company.findByIdAndDelete(params.id);
        
        if (!company) {
            return NextResponse.json(
                { message: 'Compañía no encontrada' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Compañía eliminada exitosamente' });

    } catch (error) {
        console.error(error)
        return NextResponse.json(
            { message: 'Error al eliminar la compañía' },
            { status: 500 }
        );
    }
}