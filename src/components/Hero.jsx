'use client';

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between gap-10 text-center md:text-left py-20 px-4 bg-gradient-to-b from-blue-100 to-white">
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex-1"
        >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-blue-900">
            Welcome to <span className="text-blue-600">HospitalMS</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-6">
            Efficient patient management, doctor scheduling, and more — all in one place.
            </p>
            <Button className="text-lg px-6 py-3 shadow-lg">Get Started</Button>
        </motion.div>
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex justify-center"
        >
            <img
            src="https://images.pexels.com/photos/32213424/pexels-photo-32213424.jpeg"
            alt="Hospital illustration"
            className="rounded-xl shadow-xl w-full max-w-md object-cover"
            />
        </motion.div>
        </section>
    );
}
