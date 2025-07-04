// components/UserList.jsx
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
        try {
            const res = await fetch("/api/users");
            if (!res.ok) throw new Error("Failed to fetch users");
            const data = await res.json();
            setUsers(data);
        } catch (error) {
            toast.error("Error loading users");
            console.error(error);
        }
        };
        fetchUsers();
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {users.map((user) => (
            <Card key={user.id}>
            <CardHeader>
                <CardTitle>{user.fullname || user.email}</CardTitle>
            </CardHeader>
            <CardContent>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Gender:</strong> {user.gender}</p>
                <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
                <p><strong>Doctor ID:</strong> {user.doctorAssigned ?? "None"}</p>
            </CardContent>
            </Card>
        ))}
        </div>
    );
}
