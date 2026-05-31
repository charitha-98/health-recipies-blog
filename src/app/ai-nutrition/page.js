"use client";
import { useState } from "react";
import { Sparkles, UploadCloud, CheckCircle2, Image as ImageIcon } from "lucide-react";

export default function NutritionAnalyzer() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null); 

  const handleUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setPreview(URL.createObjectURL(file));
  setLoading(true);
  setError(null);
  setData(null);

  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await fetch("/api/analyze", { method: "POST", body: formData });
    const json = await res.json();
    
    // Check if the API returned an error
    if (!res.ok) {
      throw new Error(json.error || "AI analysis failed.");
    }

    // Debugging: log what the AI is actually sending back
    console.log("Raw AI Response:", json.result);

    // Clean and parse the JSON
    const cleanJson = json.result.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleanJson);
    
    setData(parsed);
  } catch (err) {
    console.error("Upload error:", err);
    setError("Unable to identify the meal. Please try again with a clearer photo.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-xl mx-auto py-10 px-4 w-full">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2">AI Food <span className="text-emerald-600">Scanner</span></h1>
        <p className="text-slate-600">Upload a photo to get instant nutritional insights.</p>
      </div>

      
      <div className="bg-white/50 backdrop-blur-xl border border-white/50 p-6 rounded-3xl shadow-2xl shadow-emerald-600/10">
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-emerald-200 rounded-2xl cursor-pointer hover:bg-emerald-50 transition-all">
          {!preview ? (
            <>
              <UploadCloud className="text-emerald-600 mb-2" size="{32}"/>
              <span className="font-semibold text-slate-700 text-sm">Upload Food Photo</span>
            </>
          ) : (
            <img src={preview} className="h-full w-full object-cover rounded-2xl" alt="Preview" />
          )}
          <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
        </label>

        {loading && (
          <div className="mt-6 text-center text-emerald-600 font-bold animate-pulse flex items-center justify-center gap-2 text-sm">
            <Sparkles size="{18}"/> Analyzing nutrition facts...
          </div>
        )}

        {error && <p className="mt-6 text-center text-red-500 font-semibold text-sm">{error}</p>}

        {data && (
  <div className="mt-8 p-5 bg-white/60 rounded-2xl border border-white shadow-sm">
    <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
      <CheckCircle2 className="text-emerald-600" /> Nutritional Analysis
    </h3>
    
    {/* මෙතන තමයි වැදගත්ම කොටස */}
    {data.nutritional_facts ? (
      <div className="space-y-2 text-sm text-slate-700">
        <p><strong>Item:</strong> {data.food_item}</p>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {Object.entries(data.nutritional_facts).map(([key, val]) => (
            <div key={key} className="bg-emerald-50 p-2 rounded-lg">
              <p className="text-[10px] uppercase font-bold text-emerald-800">{key}</p>
              <p className="font-semibold">{val}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500 italic">"{data.notes}"</p>
      </div>
    ) : (
      <p className="text-red-500 text-sm">Nutritional data is missing from the analysis.</p>
    )}
  </div>
)}
      </div>
    </div>
  );
}