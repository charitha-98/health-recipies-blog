'use client';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function RecipePrint({ recipeData }) {
  const contentRef = useRef(null);

  const handleDownloadPDF = async () => {
    const element = contentRef.current;
    
    // 1. Canvas එක හදාගන්න (අපි කලින් වගේම)
    const canvas = await html2canvas(element, { 
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight 
    });

    const imgData = canvas.toDataURL('image/png');
    
    // 2. jsPDF හදාගන්න (A4 size)
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // 3. PDF එකේ ඉඩ ප්‍රමාණය ගණනය කරන්න
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // 4. රූපය PDF පිටුවට ගැලපෙන ලෙස Resize කිරීම (මෙන්න මේ ටික වැදගත්!)
    const imgWidth = pdfWidth - 20; // දෙපැත්තෙන් 10mm මාජින් තියන්න
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    // රූපය පිටුවට වඩා උස නම්, ඒක පිටුවට ගැලපෙන විදියට scale කරන්න
    let height = imgHeight;
    if (height > pdfHeight - 20) {
      height = pdfHeight - 20;
    }

    // 5. PDF එකට රූපය එකතු කිරීම
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, height);
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