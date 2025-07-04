'use client';
import { Button } from "@/components/ui/button";

export default function Hero() {
    return (
        <section className="flex flex-col items-center justify-center text-center py-20 px-4 bg-gradient-to-b from-blue-100 to-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to HospitalMS</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-6">
            Efficient patient management, doctor scheduling, and more — all in one place.
        </p>
        <Button className="text-lg px-6 py-3">Get Started</Button>
        </section>
    );
}
