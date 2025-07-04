import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request, { params }) {
    const id = parseInt(params.id);
    if (!id) {
        return NextResponse.json({ error: 'Invalid doctor ID' }, { status: 400 });
    }

    try {
        const doctor = await prisma.doctor.findUnique({ where: { id } });
        if (!doctor) {
        return NextResponse.json({ error: 'Doctor not found' }, { status: 404 });
        }
        return NextResponse.json(doctor);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch doctor' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const id = parseInt(params.id);
    try {
        await prisma.doctor.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete doctor' }, { status: 500 });
    }
}
