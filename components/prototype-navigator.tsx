'use client';

import React, { useState } from 'react';
import { 
  Eye, ChevronDown, Home, BookOpen, Utensils, 
  Users, Store, Calendar, Settings, Palette, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const PrototypeNavigator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const routes = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Cookbook Detail', path: '/cookbook', icon: BookOpen },
    { name: 'Recipe Detail', path: '/recipe-detail', icon: Utensils },
    { name: 'Cook Profile', path: '/cook-profile', icon: Users },
    { name: 'Vendors Index', path: '/vendors', icon: Store },
    { name: 'Events Index', path: '/events', icon: Calendar },
    { name: 'Admin Dashboard', path: '/admin', icon: Settings },
    { name: 'Style Guide', path: '/style-guide', icon: Palette },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[200]">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 bg-[#153E63] text-white rounded-3xl shadow-2xl overflow-hidden border border-white/10 w-64"
          >
            <div className="p-4 bg-white/5 border-b border-white/10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7FB7A4]">Prototype Navigator</p>
              <p className="text-xs text-white/60">Switch between page templates</p>
            </div>
            <div className="p-2 max-h-[400px] overflow-y-auto">
              {routes.map(route => (
                <Link 
                  key={route.path} 
                  href={route.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-3 rounded-xl transition-colors group ${
                    pathname === route.path ? 'bg-[#C2462C] text-white' : 'hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <route.icon size={16} className={pathname === route.path ? 'text-white' : 'text-[#7FB7A4]'} />
                    <span className="text-xs font-semibold">{route.name}</span>
                  </div>
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#C2462C] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all group"
      >
        {isOpen ? <ChevronDown size={24} /> : <Eye size={24} />}
        <span className="absolute right-full mr-4 bg-[#153E63] text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          {isOpen ? 'Close Navigator' : 'Browse Templates'}
        </span>
      </button>
    </div>
  );
};
