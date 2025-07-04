'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


export default function AdminUserForm() {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullname: '',
    phone: '',
    role: 'USER',
    gender: 'MALE',
    address: '',
    appointmentTime: '',
    doctorAssigned: '',
  });

  useEffect(() => {
    fetch('/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Email and password are required');
      return;
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...formData,
        doctorAssigned: formData.doctorAssigned ? parseInt(formData.doctorAssigned) : null,
        appointmentTime: formData.appointmentTime || null,
      }),
    });

    if (res.ok) {
      setFormData({
        email: '',
        password: '',
        fullname: '',
        phone: '',
        role: 'USER',
        gender: 'MALE',
        address: '',
        appointmentTime: '',
        doctorAssigned: '',
      });
        toast.success('User created successfully');

    } else {
      const error = await res.json();
      toast.error('Error: ' + (error.error || 'Failed to create user'));
    }
  };

  return (
    <Card className="max-w-xl mx-auto p-6 mt-10 shadow-md">
      <CardHeader>
        <CardTitle>Create User</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">

          <div>
            <Label>Email*</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          <div>
            <Label>Password*</Label>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>

          <div>
            <Label>Full Name</Label>
            <Input name="fullname" value={formData.fullname} onChange={handleChange} />
          </div>

          <div>
            <Label>Phone</Label>
            <Input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div>
            <Label>Role</Label>
            <Select value={formData.role} onValueChange={(value) => handleSelectChange('role', value)}>
              <SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="USER">User</SelectItem>
                <SelectItem value="DOCTOR">Doctor</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Gender</Label>
            <Select value={formData.gender} onValueChange={(value) => handleSelectChange('gender', value)}>
              <SelectTrigger><SelectValue placeholder="Select Gender" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Address</Label>
            <Input name="address" value={formData.address} onChange={handleChange} />
          </div>

          <div>
            <Label>Appointment Time</Label>
            <Input type="datetime-local" name="appointmentTime" value={formData.appointmentTime} onChange={handleChange} />
          </div>

          <div>
            <Label>Assign Doctor</Label>
            <select
              name="doctorAssigned"
              value={formData.doctorAssigned}
              onChange={handleChange}
              className="w-full rounded-md border border-input bg-background p-2 text-sm"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.id}>
                  {doc.name} - {doc.department} ({doc.specialization})
                </option>
              ))}
            </select>
          </div>

          <Button type="submit" className="mt-2 w-full">Create User</Button>
        </form>
      </CardContent>
    </Card>
  );
}
