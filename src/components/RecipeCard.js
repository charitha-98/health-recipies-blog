'use client'; // Interactivity සහ State සඳහා Client Component එකක් කරනවා

import { useState } from 'react';

export default function RecipeCard({ ingredients, instructions }) {
  const [servings, setServings] = useState(2); // Default servings ගණන 2 ලෙස ගන්නවා
  const defaultServings = 2;

  // Ingredients වල තියෙන සංඛ්‍යාත්මක අගයන් servings අනුව scale කරන සුපිරි Function එකක්
  const scaleQuantity = (ingredientStr, currentServings) => {
    // Regular Expression එකකින් Ingredient string එකේ මුලින්ම තියෙන අංකය (integer හෝ fraction) සොයා ගන්නවා
    // උදා: "2 cups of spinach", "1.5 tbsp olive oil", "1/2 cup almond milk"
    const numberRegex = /^(\d+(\.\d+)?|\d+\/\d+)\s*/;
    const match = ingredientStr.match(numberRegex);

    if (!match) return ingredientStr; // කිසිම අංකයක් නැත්නම් සාමාන්‍ය string එකක් ලෙස යවනවා

    const rawValue = match[1];
    let decimalValue = 0;

    if (rawValue.includes('/')) {
      // Fraction එකක් ආවොත් (උදා: 1/2) ඒක decimal අගයකට හරවනවා
      const [num, denom] = rawValue.split('/').map(Number);
      decimalValue = num / denom;
    } else {
      decimalValue = parseFloat(rawValue);
    }

    // Dynamic scale calculation: (මුල් අගය / 2) * අලුත් servings ගණන
    const scaledValue = (decimalValue / defaultServings) * currentServings;

    // අගය ලස්සනට format කිරීම (උදා: 1.5 -> 1 1/2 හෝ 1.5 විදිහටම තැබීම)
    const formattedValue = Number(scaledValue.toFixed(2)).toString();

    // මුල් අංකය වෙනුවට අලුතින් හැදුණු scale අගය string එකට ආදේශ කරනවා
    return ingredientStr.replace(numberRegex, `${formattedValue} `);
  };

  // Checklist State: Ingredients වලට ටික් දැමීමේ පහසුකම
  const [checkedIngredients, setCheckedIngredients] = useState({});

  const toggleIngredient = (index) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-10 shadow-sm space-y-8 print:border-none print:shadow-none">
      
      {/* 🌟 SCALER CONTROLS */}
      <div className="border-b border-slate-100 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-slate-900">Recipe Details</h2>
          <p className="text-xs text-slate-400 mt-1">Adjust servings to scale ingredients automatically.</p>
        </div>
        
        {/* Dynamic Servings Controls */}
        <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl w-fit">
          <span className="text-xs font-bold text-slate-500 uppercase font-mono">Servings</span>
          <div className="flex items-center gap-2">
            <button 
              type="button"
              onClick={() => setServings(Math.max(1, servings - 1))}
              className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold flex items-center justify-center hover:bg-slate-100 active:scale-95 transition"
            >
              -
            </button>
            <span className="text-sm font-black text-slate-800 w-6 text-center font-mono">{servings}</span>
            <button 
              type="button"
              onClick={() => setServings(servings + 1)}
              className="w-8 h-8 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold flex items-center justify-center hover:bg-slate-100 active:scale-95 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 🌟 INGREDIENTS CHECKLIST GRID */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-nutriPrimary font-sans">Ingredients</h3>
        {ingredients && ingredients.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 select-none">
            {ingredients.map((ingredient, index) => {
              const scaledText = scaleQuantity(ingredient, servings);
              const isChecked = !!checkedIngredients[index];

              return (
                <li 
                  key={index} 
                  onClick={() => toggleIngredient(index)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl border cursor-pointer transition-all duration-150 ${
                    isChecked 
                      ? 'bg-slate-50/80 border-slate-100 text-slate-400 line-through' 
                      : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200 shadow-sm'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-all ${
                    isChecked 
                      ? 'bg-nutriPrimary border-nutriPrimary' 
                      : 'border-slate-200 bg-white'
                  }`}>
                    {isChecked && (
                      <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm font-medium">{scaledText}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="text-xs text-slate-400 italic">No ingredients specified in CMS.</p>
        )}
      </div>

      {/* 🌟 DIRECTIONS SECTION */}
      <div className="space-y-4 pt-4 border-t border-slate-50">
        <h3 className="text-sm font-bold uppercase tracking-wider text-nutriPrimary font-sans">Instructions / Directions</h3>
        {instructions && instructions.length > 0 ? (
          <ol className="space-y-5">
            {instructions.map((step, index) => {
              const stepText = typeof step === 'string' ? step : step.text || JSON.stringify(step);
              return (
                <li key={index} className="flex gap-4 items-start text-slate-600 text-sm leading-relaxed">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-nutriPrimary/10 text-nutriPrimary font-bold text-xs flex items-center justify-center font-mono mt-0.5">
                    {index + 1}
                  </span>
                  <p className="pt-0.5">{stepText}</p>
                </li>
              );
            })}
          </ol>
        ) : (
          <p className="text-xs text-slate-400 italic">No instructions specified in CMS.</p>
        )}
      </div>

    </div>
  );
}