import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const { isAdmin } = useAuth();

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center mb-3 md:mb-0">
          <BookOpen className="w-8 h-8 mr-2" />
          <div>
            <h1 className="text-xl font-bold">Exam Admit Card Portal</h1>
            <p className="text-sm text-blue-100">Computer Based Test (CBT)</p>
          </div>
        </div>
        <nav className="flex space-x-4">
          <Link 
            to="/" 
            className="px-3 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Home
          </Link>
          <Link 
            to="/register" 
            className="px-3 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Register
          </Link>
          <Link 
            to="/admit-card" 
            className="px-3 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
          >
            Download Admit Card
          </Link>
          {isAdmin && (
            <Link 
              to="/admin/dashboard" 
              className="px-3 py-2 rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Dashboard
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;