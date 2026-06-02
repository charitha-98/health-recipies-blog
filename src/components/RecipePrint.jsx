'use client';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function RecipePrint({ recipeData }) {
  const contentRef = useRef(null);

  const handleDownloadPDF = async () => {
    const element = contentRef.current;
    
    // PDF එක හදද්දී element එකේ width එක 800px ලෙස සකසන්න
    const canvas = await html2canvas(element, { 
      scale: 2,
      backgroundColor: '#ffffff',
      windowWidth: 800, // PDF render එකේදී මෙය අනිවාර්යයි
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pdfWidth - 20; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`${recipeData.title}.pdf`);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      
      {/* මේ wrapper div එක තිරයට ගැළපෙන ලෙස හැඩගැසෙනවා */}
      <div className="w-full overflow-hidden">
        <div 
          ref={contentRef} 
          style={{ 
            padding: '40px', 
            backgroundColor: '#ffffff', 
            color: '#000000',
            width: '800px', // PDF එක සඳහාම පමණක් fixed width
            fontFamily: 'sans-serif',
            transformOrigin: 'top left',
            // තිරය 800px ට වඩා කුඩා නම් මේකෙන් shrink කරනවා
            transform: typeof window !== 'undefined' && window.innerWidth < 800 
                       ? `scale(${window.innerWidth / 800})` 
                       : 'none'
          }}
        >
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
            {recipeData.title}
          </h1>
          
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Ingredients</h2>
          
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.6' }}>
            {recipeData.ingredients?.map((item, index) => (
              <li key={index} style={{ fontSize: '18px', marginBottom: '10px' }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <button 
        onClick={handleDownloadPDF}
        className="mt-6 w-full py-3 bg-emerald-700 text-white rounded-lg font-bold"
      >
        Download PDF
      </button>
    </div>
  );
}