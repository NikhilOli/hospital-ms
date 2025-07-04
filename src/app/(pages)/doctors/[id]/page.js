'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DoctorPage() {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);

    useEffect(() => {
        fetch(`/api/doctors/${id}`)
        .then(res => res.json())
        .then(data => setDoctor(data))
        .catch(err => console.error("Failed to load doctor:", err));
    }, [id]);

    if (!doctor) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <Card className="w-full max-w-md p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            </Card>
        </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100/10 px-4">
        <Card className="w-full max-w-md p-6 shadow-lg">
            <CardHeader>
            <CardTitle className="text-2xl font-semibold">
                Dr. {doctor.name}
            </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-gray-700">
            <p><span className="font-semibold">Department:</span> {doctor.department}</p>
            <p><span className="font-semibold">Specialization:</span> {doctor.specialization}</p>
            </CardContent>
        </Card>
        </div>
    );
}
