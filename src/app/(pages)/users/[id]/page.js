'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function UserPage() {
    const { id } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`/api/users/${id}`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch(err => console.error("Failed to load user:", err));
    }, [id]);

    if (!user) {
        return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
            <Card className="w-full max-w-md p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            </Card>
        </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100/10 px-4 py-6">
        <Card className="w-full max-w-md p-6 shadow-lg">
            <CardHeader>
            <CardTitle className="text-2xl font-semibold">
                {user.fullname || 'User Info'}
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-gray-700">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Phone:</span> {user.phone || 'N/A'}</p>
            <p><span className="font-semibold">Gender:</span> {user.gender}</p>
            <p><span className="font-semibold">Address:</span> {user.address || 'N/A'}</p>
            {user.appointmentTime && (
                <p><span className="font-semibold">Appointment:</span> {new Date(user.appointmentTime).toLocaleString()}</p>
            )}
            {user.doctorAssigned && (
                <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
                <h3 className="font-semibold text-lg mb-1">Assigned Doctor</h3>
                <p><span className="font-semibold">Name:</span> {user.doctorAssigned.name}</p>
                <p><span className="font-semibold">Department:</span> {user.doctorAssigned.department}</p>
                <p><span className="font-semibold">Specialization:</span> {user.doctorAssigned.specialization || 'N/A'}</p>
                </div>
            )}
            </CardContent>
        </Card>
        </div>
    );
}
