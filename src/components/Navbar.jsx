'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <header className="bg-white shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
            <h1 className="text-2xl font-bold text-blue-600">HospitalMS</h1>

            <nav className="hidden md:flex space-x-6 text-sm font-medium text-gray-700">
            <ul className="flex space-x-4">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/doctors">Doctors</Link></li>
                <li><Link href="/users">Users</Link></li>
                <li><Link href="/login">Login</Link></li>
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
            <ul className="flex space-x-4">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/doctors">Doctors</Link></li>
                <li><Link href="/users">Users</Link></li>
                <li><Link href="/login">Login</Link></li>
            </ul>
            </div>
        )}
        </header>
    );
}
