'use client'; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Utensils, Calendar, LayoutDashboard, User, Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { name: 'Recipes', path: '/', icon: <Utensils size={18} /> },
    { name: 'AI Planner', path: '/ai-planner', icon: <Calendar size={18} /> },
    { name: 'About', path: '/about', icon: <User size={18} /> },
    
  ];

  return (
    // 🌟 Glass Navbar
    <nav className="sticky top-0 z-[100] bg-white/50 backdrop-blur-xl  border-white/40 shadow-[0_4px_30px_rgba(0,0,0,0.05)] transition-all duration-300">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-black text-xl text-slate-900 tracking-tight hover:opacity-80 transition-opacity"
        >
          <span className="bg-emerald-600 text-white p-1.5 rounded-xl shadow-lg shadow-emerald-600/20">
            <Utensils size={18} />
          </span>
          Nutri<span className="text-emerald-600">Craft</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                    : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl text-slate-700 hover:bg-black/5 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* 🌟 Luxury Mobile Dropdown (Glass Morphism enhanced) */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/60 backdrop-blur-2xl border-b border-white/50 shadow-2xl px-6 py-6 space-y-3 z-[90] animate-fadeIn">
          {navItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-700 hover:bg-white/60'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}