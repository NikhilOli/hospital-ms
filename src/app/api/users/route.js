import { NextResponse } from 'next/server';
import prisma from '../../../lib/prisma'
import bcrypt from 'bcryptjs';

export async function POST(request) {
    try {
        const data = await request.json();
        const { email, password, fullname, phone, role, gender, address, appointmentTime, doctorAssigned } = data;
        
        if (!email || !password) {
            return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
        }
        const existingUser = await prisma.user.findUnique({ where: { email } });

        if (existingUser) {
            return NextResponse.json({ error: 'User already exists' }, { status: 409 });
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
                doctorAssigned: doctorAssigned ? { connect: { id: doctorAssigned } } : undefined,
            },
        });

    return NextResponse.json(user, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
    }
}

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        return NextResponse.json(users);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}