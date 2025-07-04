'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaUserMd, FaCalendarCheck, FaTachometerAlt } from "react-icons/fa";

const services = [
    {
        title: "Patient Management",
        description: "Manage patient records and appointments with ease.",
        icon: <FaCalendarCheck className="text-blue-600 text-3xl mb-2" />,
    },
    {
        title: "Doctor Scheduling",
        description: "Assign and schedule doctors efficiently.",
        icon: <FaUserMd className="text-blue-600 text-3xl mb-2" />,
    },
    {
        title: "Admin Dashboard",
        description: "Control users, roles, and permissions from a single panel.",
        icon: <FaTachometerAlt className="text-blue-600 text-3xl mb-2" />,
    },
];

export default function Services() {
    return (
        <section className="py-16 px-4 bg-white">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold">Our Services</h2>
            <p className="text-muted-foreground">Everything you need to run a modern hospital system.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, i) => (
            <Card key={i} className="shadow-lg hover:scale-105 transition-transform duration-300">
                <CardHeader className="flex flex-col items-center">
                {service.icon}
                <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-sm text-muted-foreground text-center">{service.description}</p>
                </CardContent>
            </Card>
            ))}
        </div>
        </section>
    );
}
