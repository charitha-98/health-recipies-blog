// src/components/Footer.jsx
export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 bg-slate-50 border-t border-slate-200 mt-20">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div className="space-y-2">
          <h2 className="text-xl font-black text-slate-900">NutriCraft</h2>
          <p className="text-slate-500 text-sm">
            Making healthy eating simple and accessible for everyone.
          </p>
        </div>

        {/* Links */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-900">Explore</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>Recipes</li>
            <li>AI Planner</li>
            <li>AI Nutrition</li>
          </ul>
        </div>

        {/* Legal/Contact */}
        <div className="space-y-2">
          <h4 className="font-bold text-slate-900">Legal</h4>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Contact Us</li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto mt-12 pt-8 border-t border-slate-200 text-center text-slate-400 text-xs">
        © 2026 NutriCraft. All rights reserved.
      </div>
    </footer>
  );
}