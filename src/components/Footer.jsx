import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gradient-to-t from-blue-50 via-white to-white border-t border-gray-200 text-gray-600 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>&copy; {new Date().getFullYear()} HospitalMS. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
            <a href="#" className="hover:text-blue-600">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600">Terms of Service</a>
            <a href="#" aria-label="Facebook" className="hover:text-blue-600"><FaFacebook /></a>
            <a href="#" aria-label="Twitter" className="hover:text-blue-600"><FaTwitter /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-blue-600"><FaLinkedin /></a>
            </div>
        </div>
        </footer>
    );
}
