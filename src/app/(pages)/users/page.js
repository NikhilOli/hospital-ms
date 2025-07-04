'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/users')
        .then(res => res.json())
        .then(data => setUsers(data))
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
        {users.map((user) => (
            <Card key={user.id} className="shadow-sm">
            <CardHeader>
                <CardTitle>{user.fullname || 'No Name'}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">Email: {user.email}</p>
                <p className="text-sm text-muted-foreground">Role: {user.role}</p>
                {user.doctorAssigned && (
                    <div className="text-sm text-muted-foreground">
                        <div>Doctor: {user.doctorAssigned.name}</div>
                        <div>Department: {user.doctorAssigned.department}</div>
                        <div>Specialization: {user.doctorAssigned.specialization}</div>
                    </div>
                )}


            </CardContent>
            </Card>
        ))}
        </div>
    );
}
