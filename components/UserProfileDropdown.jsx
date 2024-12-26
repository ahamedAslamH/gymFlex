'use client'

import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, User, Settings } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function UserProfileDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) return null;

  return (
    <div className="flex items-center gap-4">
      <div className="relative" ref={dropdownRef}>
        <Avatar 
          className="cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <AvatarImage src={user.photoURL} alt={user.displayName} />
          <AvatarFallback>{user.displayName?.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className={`absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ${isOpen ? 'block' : 'hidden'}`}>
          <div className="px-4 py-2 text-sm text-gray-700 border-b">
            {user.displayName}
          </div>
          
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/profile">
              <User className="mr-2" size={16} />
              Profile
            </a>
          </Button>
          
          <Button variant="ghost" className="w-full justify-start" asChild>
            <a href="/settings">
              <Settings className="mr-2" size={16} />
              Settings
            </a>
          </Button>
        </div>
      </div>
      
      <Button 
        variant="destructive" 
        size="sm"
        className="flex items-center gap-2"
        onClick={logout}
      >
        <LogOut size={16} />
        Logout
      </Button>
    </div>
  );
} 