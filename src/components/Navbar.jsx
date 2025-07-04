'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BsHospital } from "react-icons/bs";
import Link from 'next/link';
import { Activity } from 'lucide-react';

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
        <header className="bg-white/80 backdrop-blur shadow-sm sticky top-0 z-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
            <Link href="/">
                <div className="flex items-center space-x-2">
                    <Activity className="text-blue-600 text-3xl inline-block mr-2" />
                    <h1 className="text-2xl font-bold text-blue-600 tracking-tight">HospitalMS</h1>
                    <BsHospital className="text-blue-600 text-3xl inline-block mr-2" />
                </div>
            </Link>
            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            <ul className="flex space-x-4 items-center">
                <li>
                <Link href="/" className="relative group">
                    Home
                    <span className="block h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </Link>
                </li>
                {(role && navLinks[role]) &&
                navLinks[role].map(link => (
                    <li key={link.href}>
                    <Link href={link.href} className="relative group">
                        {link.label}
                        <span className="block h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </Link>
                    </li>
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
                <li>
                    <Link href="/login" className="relative group">
                    Login
                    <span className="block h-0.5 bg-blue-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                    </Link>
                </li>
                )}
            </ul>
            </nav>
            {/* Mobile Nav Toggle */}
            <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
                {isOpen ? <X /> : <Menu />}
            </Button>
            </div>
        </div>
        {/* Mobile Nav */}
        {isOpen && (
            <div className="md:hidden px-4 pb-4 space-y-2 text-gray-700 animate-fade-in-down">
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
