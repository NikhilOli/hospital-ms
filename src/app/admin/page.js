'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminDashboard from '@/components/AdminDashboard';

export default function AdminPageWrapper() {
    const router = useRouter();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const isAdmin = localStorage.getItem('role') === 'ADMIN';
        if (!isAdmin) router.push('/login');
        setLoading(false);
    }, [router]);

    return (
        isLoading ? (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg text-gray-500">Loading... It might take some time</div>
            </div>
        ) : (
            <AdminDashboard />
        )
    );
}
