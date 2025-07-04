export default function Footer() {
    return (
        <footer className="bg-gray-100 text-gray-600 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} HospitalMS. All rights reserved.</p>
            <div className="space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            </div>
        </div>
        </footer>
    );
}
