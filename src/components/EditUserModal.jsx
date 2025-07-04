'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

export default function EditUserModal({ user, doctors, onClose, onSave }) {
    const [form, setForm] = useState({
        fullname: user.fullname || '',
        email: user.email || '',
        phone: user.phone || '',
        gender: user.gender || 'Male',
        address: user.address || '',
        doctorAssignedId: user.doctorAssignedId || '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleDoctorChange = (value) => {
        setForm({ ...form, doctorAssignedId: value === 'none' ? null : value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`/api/users/${user.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...form, doctorAssigned: form.doctorAssignedId ? parseInt(form.doctorAssignedId) : null })
            });

            if (res.ok) {
                toast('User updated successfully');
                onSave();
                onClose();
            } else {
                const err = await res.json();
                toast(`Error: ${err.error || 'Failed to update user'}`, { variant: 'destructive' });
            }
        } catch (error) {
            console.error(error);
            toast('Update failed', { variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <Label>Full Name</Label>
                        <Input name="fullname" value={form.fullname} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label>Email</Label>
                        <Input name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div>
                        <Label>Phone</Label>
                        <Input name="phone" value={form.phone} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Gender</Label>
                        <Select value={form.gender} onValueChange={(value) => setForm({ ...form, gender: value })}>
                            <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="MALE">Male</SelectItem>
                                <SelectItem value="FEMALE">Female</SelectItem>
                                <SelectItem value="OTHER">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div>
                        <Label>Address</Label>
                        <Input name="address" value={form.address} onChange={handleChange} />
                    </div>
                    <div>
                        <Label>Assigned Doctor</Label>
                        <Select
                            value={form.doctorAssignedId || 'none'}
                            onValueChange={handleDoctorChange}
                        >
                            <SelectTrigger>
                            <SelectValue placeholder="Select Doctor" />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="none">None</SelectItem>
                            {doctors.map((doc) => (
                                <SelectItem key={doc.id} value={doc.id.toString()}>
                                Dr. {doc.name} — {doc.department}
                                </SelectItem>
                            ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex justify-end gap-2 cursor-pointer">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={loading}>Save</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
