export async function GET() {
    try {
        const doctors = await prisma.doctor.findMany();
        return NextResponse.json(doctors);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch doctors' }, { status: 500 });
    }
}