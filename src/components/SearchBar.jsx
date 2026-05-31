'use client';
import { Search } from 'lucide-react';

export default function SearchBar() {
  return (
    <div className="relative max-w-md mx-auto my-8">
      <div className="relative">
        <Search className="absolute left-3 top-3 text-slate-500" size={20} />
        <input 
          type="text" 
          placeholder="Search for healthy recipes..." 
          className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-full bg-white/20 backdrop-blur-xl shadow-lg shadow-emerald-500/10 text-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
        />
      </div>
    </div>
  );
}