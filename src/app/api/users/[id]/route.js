import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req, {params}) {
    const { id } = await params;
    try {
        const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: {
            doctorAssigned: true,
        },
        });
        if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error('User fetch error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(req, { params }) {
    const id = parseInt(params.id);
    const data = await req.json();
    try {
        const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            fullname: data.fullname,
            phone: data.phone,
            gender: data.gender,
            address: data.address,
            appointmentTime: data.appointmentTime ? new Date(data.appointmentTime) : null,
            doctorAssigned: data.doctorAssigned ? { connect: { id: data.doctorAssigned } } : undefined,
        },
        });
        return NextResponse.json(updatedUser);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const id = parseInt(params.id);
    try {
        await prisma.user.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
    }
}
