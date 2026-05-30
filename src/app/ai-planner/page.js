'use client';

import { useState } from 'react';
import { Sparkles, Loader2, Apple } from 'lucide-react';

export default function AIPlanner() {
  const [formData, setFormData] = useState({ goal: 'low-carb', condition: 'none', calories: 1800 });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/meal-planner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (!res.ok) throw new Error("Server responded with an error");
      
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("AI Agent එකෙන් response එකක් ගන්න බැරි වුණා. .env.local එකේ GROQ_API_KEY එක නිවැරදිද බලන්න.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-slate-700 flex items-center justify-center gap-2">
          <Sparkles className="text-emerald-500 animate-pulse" />AI-Powered Hyper-Personalized Meal Planner
          <Sparkles className="text-emerald-500 animate-pulse" />
        </h1>
        <p className="text-slate-600 mt-2">Let our advanced Llama 3.3 AI Agent craft a medical-grade meal plan for you in seconds.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 h-fit">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Diet Goal</label>
            <select 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
              value={formData.goal}
              onChange={e => setFormData({...formData, goal: e.target.value})}
            >
              <option value="low-carb">Low-Carb / Keto</option>
              <option value="high-protein">High-Protein Lean Mass</option>
              <option value="vegan">Plant-Based / Vegan</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Health Conditions</label>
            <select 
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none"
              value={formData.condition}
              onChange={e => setFormData({...formData, condition: e.target.value})}
            >
              <option value="none">None (General Fitness)</option>
              <option value="diabetes">Type 2 Diabetes Friendly</option>
              <option value="hypertension">Hypertension (Low Sodium)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Daily Calories ({formData.calories} kcal)</label>
            <input 
              type="range" min="1200" max="3500" step="100" value={formData.calories}
              className="w-full accent-emerald-600 cursor-pointer"
              onChange={e => setFormData({...formData, calories: Number(e.target.value)})}
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 transition text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 disabled:bg-slate-400"
          >
            {loading ? <Loader2 className="animate-spin w-4 h-4"/> : "Generate Plan"}
          </button>
        </form>

        <div className="md:col-span-2 space-y-6">
          {loading && (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-sm">
              <Loader2 className="animate-spin w-8 h-8 text-emerald-600 mx-auto mb-3"/>
              AI Agent is computing optimal macros and filtering matching recipes...
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-800 rounded-2xl p-5 text-sm">
              {error}
            </div>
          )}

          {!loading && result && result.mealPlan && (
            <>
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-emerald-900 text-sm flex gap-3">
                <Apple className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div><strong>AI Nutritionist Advice:</strong> {result.nutritionistAdvice}</div>
              </div>

              <div className="space-y-4">
                {result.mealPlan.map((plan, index) => (
                  <div key={index} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-slate-900 text-lg mb-4 border-b pb-2 text-emerald-700">{plan.day}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="font-bold block text-xs uppercase text-slate-400 mb-1">Breakfast</span>
                        <p className="text-slate-700 font-medium">{plan.breakfast.meal}</p>
                        <span className="text-xs text-slate-500 font-mono">{plan.breakfast.calories} kcal</span>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-emerald-100">
                        <span className="font-bold block text-xs uppercase text-emerald-600 mb-1">Lunch</span>
                        <p className="text-slate-700 font-medium">{plan.lunch.meal}</p>
                        <span className="text-xs text-slate-500 font-mono block mb-1">{plan.lunch.calories} kcal</span>
                        {plan.lunch.recipeId && (
                          <a href={`/recipes/${plan.lunch.recipeId}`} className="text-xs text-emerald-600 font-bold hover:underline">View Recipe →</a>
                        )}
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl">
                        <span className="font-bold block text-xs uppercase text-slate-400 mb-1">Dinner</span>
                        <p className="text-slate-700 font-medium">{plan.dinner.meal}</p>
                        <span className="text-xs text-slate-500 font-mono">{plan.dinner.calories} kcal</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!loading && !result && !error && (
            <div className="border border-dashed border-slate-300 bg-white rounded-2xl p-12 text-center text-slate-400 text-sm shadow-sm">
              Select your health filters and press "Generate Plan" to invoke the AI agent.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}