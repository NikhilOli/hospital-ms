'use client';

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Contact() {
    return (
        <section className="py-16 px-4 bg-white">
        <div className="max-w-xl mx-auto">
            <Card className="shadow-xl">
            <CardHeader>
                <CardTitle className="text-3xl font-semibold text-center mb-2">Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
                <form className="space-y-4">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your name" />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div>
                    <Label htmlFor="message">Message</Label>
                    <textarea
                    id="message"
                    rows="4"
                    className="w-full rounded-md border border-input bg-background p-2 text-sm"
                    placeholder="Your message..."
                    ></textarea>
                </div>
                <Button type="submit" className="w-full text-lg">Send Message</Button>
                </form>
            </CardContent>
            </Card>
        </div>
        </section>
    );
}
