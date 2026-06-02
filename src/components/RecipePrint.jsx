'use client';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function RecipePrint({ recipeData }) {
  const contentRef = useRef(null);

  const handleDownloadPDF = async () => {
  const element = contentRef.current;
  
  // Mobile වලදී div එකේ content එක හරියටම ගන්න මේ settings පාවිච්චි කරන්න
  const canvas = await html2canvas(element, { 
    scale: 5,
    backgroundColor: '#ffffff',
    useCORS: true,
    // මේ පේළි දෙක ඉතා වැදගත්!
    windowWidth: element.scrollWidth, 
    windowHeight: element.scrollHeight,
    logging: false
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  
  // image එක PDF පිටුවට ගැලපෙන ලෙස හදන්න
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`${recipeData.title}.pdf`);
};

  return (
    <div className="my-10 p-4 md:p-10 border-2 border-dashed border-emerald-500 rounded-xl w-full max-w-2xl mx-auto">
      
      {/* මේ Div එකේ තියෙන දේවල් විතරයි PDF එකට වැටෙන්නේ */}
      <div ref={contentRef} className="p-6 bg-white text-black" style={{ backgroundColor: '#ffffff', color: '#000000' , minHeight: 'fit-content'}}>
        
        {/* 1. නම */}
        <h1 className="text-3xl font-black mb-6">{recipeData.title}</h1>

        {recipeData.image && (
    <img 
      src={recipeData.image} 
      alt={recipeData.title} 
      style={{ width: '100%', height: 'auto', marginBottom: '20px', borderRadius: '8px' }}
      crossOrigin="anonymous" // මේක අනිවාර්යයෙන්ම දාන්න, එතකොටයි html2canvas වලට පින්තූරය පේන්නේ
    />
  )}
        
        {/* 2. Ingredients ටික විතරයි */}
        <h2 className="text-xl font-bold mb-3">Ingredients</h2>
        <ul className="list-disc ml-5 space-y-2">
          {recipeData.ingredients?.map((item, index) => (
            <li key={index} className="text-lg">{item}</li>
          ))}
        </ul>
        
      </div>

      <div className="mt-8 flex justify-center">
        <button 
          onClick={handleDownloadPDF}
          className="px-6 py-2 bg-emerald-700 text-white rounded-full font-bold cursor-pointer"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}