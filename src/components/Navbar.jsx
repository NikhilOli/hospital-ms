'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [role, setRole] = useState(null);
    const [userId, setUserId] = useState(null);
    const [doctorId, setDoctorId] = useState(null);

    useEffect(() => {
        const loadUser = () => {
            const storedRole = localStorage.getItem('role');
            const storedUserId = localStorage.getItem('userId');
            const storedDoctorId = localStorage.getItem('doctorId');
            setRole(storedRole);
            setUserId(storedUserId);
            setDoctorId(storedDoctorId);
        };

        loadUser();

        const handleStorage = () => loadUser();
        window.addEventListener('storage', handleStorage);

        return () => window.removeEventListener('storage', handleStorage);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navLinks = {
        ADMIN: [
            { label: 'Dashboard', href: '/admin' },
            { label: 'Doctors', href: '/doctors' },
            { label: 'Users', href: '/users' },
            { label: 'Create User', href: '/admin/users' },
        ],
        DOCTOR: doctorId ? [
            { label: 'My Profile', href: `/doctors/${doctorId}` },
        ] : [],
        USER: userId ? [
            { label: 'My Info', href: `/users/${userId}` },
        ] : [],
    };

    return (
        <header className="bg-white shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
                <Link href="/">
                    <h1 className="text-2xl font-bold text-blue-600">HospitalMS</h1>
                </Link>

                <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
                    <ul className="flex space-x-4">
                        <li><Link href="/">Home</Link></li>
                        {(role && navLinks[role]) &&
                            navLinks[role].map(link => (
                                <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                            ))
                        }
                        {role ? (
                            <li>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('role');
                                        localStorage.removeItem('userId');
                                        localStorage.removeItem('doctorId');
                                        window.dispatchEvent(new Event("storage"));
                                        window.location.href = "/login";
                                    }}
                                    className="text-red-500 hover:underline cursor-pointer"
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <li><Link href="/login">Login</Link></li>
                        )}
                    </ul>
                </nav>

                <div className="md:hidden">
                    <Button variant="ghost" size="icon" onClick={toggleMenu}>
                        {isOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700">
                    <ul className="flex flex-col gap-2">
                        <li><Link href="/">Home</Link></li>
                        {(role && navLinks[role]) &&
                            navLinks[role].map(link => (
                                <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                            ))
                        }
                        {role ? (
                            <li>
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('role');
                                        localStorage.removeItem('userId');
                                        localStorage.removeItem('doctorId');
                                        window.dispatchEvent(new Event("storage"));
                                        window.location.href = "/login";
                                    }}
                                    className="text-red-500 hover:underline cursor-pointer"
                                >
                                    Logout
                                </button>
                            </li>
                        ) : (
                            <li><Link href="/login">Login</Link></li>
                        )}
                    </ul>
                </div>
            )}
        </header>
    );
}
