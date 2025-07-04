'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPageWrapper() {
    const router = useRouter();

    useEffect(() => {
        const isAdmin = localStorage.getItem('role') === 'ADMIN';
        if (!isAdmin) router.push('/login');
    }, [router]);

    return <AdminDashboard />;
}
