'use client';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function RecipePrint({ recipeData }) {
  const contentRef = useRef(null);

  const handleDownloadPDF = async () => {
    const element = contentRef.current;
    
    // Canvas එක හදනකොට width එක FIXED කරන්න
    const canvas = await html2canvas(element, { 
      scale: 2,
      backgroundColor: '#ffffff',
      windowWidth: 800, // Fixed width එකක් දෙන්න (A4 වලට ගැලපෙන්න)
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pdfWidth - 20; 
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save(`${recipeData.title}.pdf`);
  };

  return (
    <div className="w-full p-4">
      {/* මේ Div එකේ තියෙන CSS වෙනස් කළා */}
      <div 
        ref={contentRef} 
        style={{ 
            padding: '40px', 
            backgroundColor: '#ffffff', 
            color: '#000000',
            width: '800px', // PDF එකට ගැලපෙන පළල
            fontFamily: 'sans-serif'
        }}
      >
        {/* <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '20px' }}>
            {recipeData.title}
        </h1>
        
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '15px' }}>Ingredients</h2>
        
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', lineHeight: '1.6' }}>
          {recipeData.ingredients?.map((item, index) => (
            <li key={index} style={{ fontSize: '18px', marginBottom: '10px' }}>{item}</li>
          ))}
        </ul> */}
      </div>

      <button 
        onClick={handleDownloadPDF}
        style={{ marginTop: '20px', padding: '10px 20px', background: 'green', color: 'white', borderRadius: '5px' }}
      >
        Download PDF
      </button>
    </div>
  );
}