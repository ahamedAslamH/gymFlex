'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LoginButton from './LoginButton'
import UserProfileDropdown from './UserProfileDropdown'
import { useAuth } from '@/contexts/AuthContext'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const { user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Home', 'Dashboard', 'Classes', 'Trainers'];
  const getNavLink = (item) => {
    if (item === 'Home') return '/';
    return `/${item.toLowerCase()}`;
  };

  return (
    <nav className={`${
      isScrolled 
        ? 'fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-md transition-all duration-200 z-50' 
        : 'bg-white shadow-md'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800 font-playfair">
              GymFlex
            </Link>
          </div>
          <div className="hidden sm:flex sm:items-center sm:justify-center flex-1 sm:space-x-12">
            {navItems.map((item, index) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={getNavLink(item)}
                  className="text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-md text-base font-medium font-poppins tracking-wide transition-colors duration-200"
                >
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="hidden sm:flex sm:items-center space-x-4">
            {!user ? <LoginButton /> : <UserProfileDropdown />}
          </div>
        </div>
      </div>
    </nav>
  );
}

