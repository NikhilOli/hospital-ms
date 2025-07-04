'use client';

export default function About() {
    return (
        <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-4 text-blue-800">About Us</h2>
            <p className="text-muted-foreground text-lg">
                HospitalMS is designed to digitize and simplify hospital workflows. Whether you're a doctor, admin, or patient — we’ve got tools tailored for your needs.
            </p>
            </div>
            <div className="flex-1 flex justify-center">
            <img
                src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=500&q=80"
                alt="About HospitalMS"
                className="rounded-xl shadow-lg w-full max-w-xs object-cover"
            />
            </div>
        </div>
        </section>
    );
}
