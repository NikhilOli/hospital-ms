'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { toast } from 'sonner';

export default function LoginPage() {
    const [role, setRole] = useState('USER');
    const [form, setForm] = useState({ email: '', password: '', doctorId: '' });
    const [doctors, setDoctors] = useState([]);
    const router = useRouter();

    useEffect(() => {
        if (role === 'DOCTOR') {
            fetch('/api/doctors')
                .then(res => res.json())
                .then(data => setDoctors(data));
        }
    }, [role]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleRoleChange = (value) => {
        setRole(value);
        setForm({ email: '', password: '', doctorId: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (role === 'ADMIN') {
            if (form.email === 'admin@hospitalms.com' && form.password === 'Admin@123') {
                localStorage.setItem('role', 'ADMIN');
                window.dispatchEvent(new Event("storage"));
                toast("Admin logged in!", { description: "Redirecting to dashboard..." });
                router.push('/admin');
            } else {
                toast("Invalid admin credentials", {
                    description: "Please check your email and password",
                    variant: "destructive",
                });
            }
            return;
        }

        if (role === 'DOCTOR') {
            if (!form.doctorId) {
                toast("Please select a doctor", { variant: "destructive" });
                return;
            }
            localStorage.setItem('role', 'DOCTOR');
            localStorage.setItem('doctorId', form.doctorId); // ✅ save doctor id
            window.dispatchEvent(new Event("storage"));
            toast("Doctor logged in!", { description: "Redirecting..." });
            router.push(`/doctors/${form.doctorId}`);
            return;
        }

        if (role === 'USER') {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: form.email, password: form.password }),
            });
            const data = await res.json();
            if (data.success && data.role === 'USER') {
                localStorage.setItem('role', 'USER');
                localStorage.setItem('userId', data.userId); // ✅ save user id
                window.dispatchEvent(new Event("storage"));
                toast("User logged in!", { description: "Welcome!" });
                router.push(`/users/${data.userId}`);
            } else {
                toast("Invalid user credentials", {
                    description: data.message || "Try again",
                    variant: "destructive",
                });
            }
        }
    };



    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md space-y-6"
            >
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <Select value={role} onValueChange={handleRoleChange}>
                    <SelectTrigger>
                        <span>{role.charAt(0) + role.slice(1).toLowerCase()}</span>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="DOCTOR">Doctor</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                    </SelectContent>
                </Select>

                {role === 'DOCTOR' ? (
                    <div>
                        <label className="block mb-1 text-sm font-medium">Select Doctor</label>
                        <Select value={form.doctorId} onValueChange={value => setForm({ ...form, doctorId: value })}>
                            <SelectTrigger>
                                <span>
                                    {form.doctorId
                                        ? doctors.find(d => d.id === parseInt(form.doctorId))?.name
                                        : "Choose doctor"}
                                </span>
                            </SelectTrigger>
                            <SelectContent>
                                {doctors.map(doc => (
                                    <SelectItem key={doc.id} value={doc.id.toString()}>
                                        {doc.name} — {doc.department}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                ) : (
                    <>
                        <Input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />
                        <Input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}

                <Button type="submit" className="w-full cursor-pointer">
                    Login
                </Button>
            </form>
        </div>
    );
}
