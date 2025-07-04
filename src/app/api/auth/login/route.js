import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req) {
    const { email, password } = await req.json();

    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
        return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        return NextResponse.json({ success: false, message: 'Invalid password' }, { status: 401 });
        }

        return NextResponse.json({
        success: true,
        role: user.role,
        userId: user.id,
        message: 'Login successful',
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
    }
}
