'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
    { title: "Patient Management", description: "Manage patient records and appointments with ease." },
    { title: "Doctor Scheduling", description: "Assign and schedule doctors efficiently." },
    { title: "Admin Dashboard", description: "Control users, roles, and permissions from a single panel." },
];

export default function Services() {
    return (
        <section className="py-16 px-4 bg-white">
        <div className="text-center mb-10">
            <h2 className="text-3xl font-semibold">Our Services</h2>
            <p className="text-muted-foreground">Everything you need to run a modern hospital system.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {services.map((service, i) => (
            <Card key={i} className="shadow-md">
                <CardHeader>
                <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
            </Card>
            ))}
        </div>
        </section>
    );
}
