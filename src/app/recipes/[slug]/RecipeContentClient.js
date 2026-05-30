'use client';

import { useState } from 'react';
import { Clock, Flame, ShieldCheck } from 'lucide-react';

export default function RecipeContentClient({ recipe }) {
  const [servings, setServings] = useState(recipe.baseServings);

  const scaleFactor = servings / recipe.baseServings;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      
      {/* Left side: Ingredients and Interactive Widget */}
      <div className="lg:col-span-2 space-y-8">
        
        {/* Dynamic Calculator Widget */}
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-emerald-900 mb-3 flex items-center gap-2">
            <ShieldCheck className="text-emerald-600 w-5 h-5"/> Dynamic Serving Adjustment
          </h3>
          <p className="text-sm text-emerald-800 mb-4">Adjust servings to automatically scale ingredient metrics accurately.</p>
          <div className="flex items-center gap-4">
            <input 
              type="range" 
              min="1" 
              max="10" 
              value={servings}
              onChange={(e) => setServings(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
            />
            <span className="text-xl font-bold text-emerald-700 min-w-[3ch] text-center">{servings}</span>
            <span className="text-sm font-semibold text-emerald-600">Servings</span>
          </div>
        </div>

        {/* Ingredients List */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Ingredients You'll Need</h2>
          <ul className="divide-y divide-slate-200 border-t border-b border-slate-200">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className="py-3 flex justify-between items-center text-base">
                <span className="text-slate-700 font-medium">{ing.name}</span>
                <span className="font-mono bg-slate-100 px-2.5 py-0.5 rounded text-slate-800 text-sm">
                  {(ing.amount * scaleFactor).toFixed(typeof ing.amount === 'number' && ing.amount % 1 === 0 ? 0 : 1)} {ing.unit}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Step-by-Step Instructions</h2>
          <ol className="space-y-4">
            {recipe.instructions.map((step, idx) => (
              <li key={idx} className="flex gap-4 p-4 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                  {idx + 1}
                </span>
                <p className="text-slate-600 leading-relaxed pt-0.5">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Right side: Sticky Macro & Monetization Sidebar */}
      <div className="space-y-6 lg:sticky lg:top-24 h-fit">
        
        {/* Quick Stats & Macros */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
            <span className="text-slate-500 flex items-center gap-1.5"><Clock className="w-4 h-4"/> Total Time</span>
            <span className="font-semibold text-slate-800">15 Mins</span>
          </div>
          <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-3">
            <span className="text-slate-500 flex items-center gap-1.5"><Flame className="w-4 h-4"/> Calories</span>
            <span className="font-semibold text-slate-800">{recipe.calories}</span>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Macronutrients</h4>
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-2.5">
                <span className="block text-xs font-semibold text-blue-600">Protein</span>
                <span className="text-sm font-bold text-blue-900">{recipe.macros.protein}</span>
              </div>
              <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-2.5">
                <span className="block text-xs font-semibold text-amber-600">Carbs</span>
                <span className="text-sm font-bold text-amber-900">{recipe.macros.carbs}</span>
              </div>
              <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-2.5">
                <span className="block text-xs font-semibold text-rose-600">Fat</span>
                <span className="text-sm font-bold text-rose-900">{recipe.macros.fat}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Amazon Affiliate Box Placeholder */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-md">
          <h4 className="font-bold text-emerald-400 mb-1">Chef's Recommended Gear</h4>
          <p className="text-xs text-slate-400 mb-4">Tested & recommended tools for this exact recipe.</p>
          <a 
            href="https://amazon.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block text-center bg-emerald-500 hover:bg-emerald-600 transition text-slate-950 font-bold py-2.5 rounded-xl text-sm"
          >
            Buy Premium Salad Spinner
          </a>
        </div>
      </div>

    </div>
  );
}