import DoctorList from '@/components/DoctorList';
export default function DoctorsPage() {
    return (
        <div className="mt-4">
        <h1 className="text-center text-2xl font-semibold">Doctors</h1>
        <DoctorList />
        </div>
    );
}
