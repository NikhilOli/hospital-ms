'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import EditUserModal from '@/components/EditUserModal';

export default function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);

    const fetchData = async () => {
        const [usersRes, doctorsRes] = await Promise.all([
            fetch('/api/users'),
            fetch('/api/doctors')
        ]);
        const usersData = await usersRes.json();
        const doctorsData = await doctorsRes.json();
        setUsers(usersData);
        setDoctors(doctorsData);
        setLoading(false)
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (type, id) => {
        const confirmed = confirm(`Are you sure you want to delete this ${type}?`);
        if (!confirmed) return;

        const res = await fetch(`/api/${type}s/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            toast(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted.`);
            fetchData();
        } else {
            toast(`Failed to delete ${type}`, { variant: 'destructive' });
        }
    };

    const handleEdit = (user) => {
        const userWithDoctor = {
            ...user,
            doctorAssignedId: user.doctorAssignedId ? user.doctorAssignedId.toString() : 'none',
        };
        setEditingUser(userWithDoctor);
    };

    return (
        isLoading ? (
            <div className="flex items-center justify-center h-screen">
                <div className="text-lg text-gray-500">Loading... It might take some time</div>
            </div>
        ) : (
            <div className="p-6 space-y-10">
            <h1 className="text-3xl font-bold text-center">Admin Dashboard</h1>

            <section>
                <h2 className="text-xl font-semibold mb-4">Users</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {users.map(user => (
                        <Card key={user.id} className="relative">
                            <CardHeader>
                                <CardTitle>{user.fullname || 'Unnamed User'}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-1">
                                <p>Email: {user.email}</p>
                                <p>Role: {user.role}</p>
                                <p>Doctor: {user.doctorAssigned?.name || 'None Assigned'}</p>
                                <div className="flex gap-2 mt-2">
                                    <Button size="sm" onClick={() => handleEdit(user)}>Edit</Button>
                                    <Button size="sm" onClick={() => handleDelete('user', user.id)}>Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="text-xl font-semibold mb-4">Doctors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {doctors.map(doctor => (
                        <Card key={doctor.id} className="relative">
                            <CardHeader>
                                <CardTitle>Dr. {doctor.name}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm space-y-1">
                                <p>Department: {doctor.department}</p>
                                <p>Specialization: {doctor.specialization}</p>
                                <div className="flex gap-2 mt-2">
                                    <Button size="sm" onClick={() => handleDelete('doctor', doctor.id)}>Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {editingUser && (
                <EditUserModal
                    user={editingUser}
                    doctors={doctors}
                    onClose={() => setEditingUser(null)}
                    onSave={fetchData}
                />
            )}
        </div>
        )
    );
}
