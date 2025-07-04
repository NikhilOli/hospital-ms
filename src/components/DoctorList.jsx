'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function DoctorList() {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/doctors')
        .then((res) => res.json())
        .then((data) => setDoctors(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 rounded-xl" />
            ))}
        </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {doctors.map((doctor) => (
            <Card key={doctor.id} className="shadow-sm">
            <CardHeader>
                <CardTitle>{doctor.name}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Department: {doctor.department}</p>
                <p className="text-sm text-muted-foreground">Specialization: {doctor.specialization}</p>
            </CardContent>
            </Card>
        ))}
        </div>
    );
}