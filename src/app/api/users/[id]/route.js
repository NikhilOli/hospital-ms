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
