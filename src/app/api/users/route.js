import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const data = await request.json();
        const { email, password, fullname, phone, role, gender, address, appointmentTime, doctorassigned } = data;

        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                fullname,
                phone,
                role,
                gender,
                address,
                appointmentTime: appointmentTime ? new Date(appointmentTime) : null,
                doctorassigned,
            },
        });

    return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}
