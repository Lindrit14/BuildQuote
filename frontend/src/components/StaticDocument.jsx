// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Leistungen from './Leistungen';
import Footer from './Footer';
import html2pdf from 'html2pdf.js';

function StaticDocument() {
  const navigate = useNavigate();
  const location = useLocation();
  const { documentData, type } = location.state;
  const documentRef = useRef(null);

  const handleGeneratePDF = () => {
    const element = documentRef.current;
    const opt = {
      margin: 1,
      filename: `${type === 'angebot' ? 'Angebot' : 'Rechnung'}-${documentData.offerNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().from(element).set(opt).save();
  };

  const handleNavigateBack = () => {
    navigate('/');
  };

  return (
    <div className="p-12 bg-white rounded-xl shadow-md flex flex-col h-screen w-3/4" ref={documentRef}>
      <button onClick={handleNavigateBack} className="btn btn-secondary mb-4">Back</button>
      <Header data={documentData} type={type} handleChange={() => {}} />
      <Leistungen items={documentData.items} handleAddItem={() => {}} handleRemoveItem={() => {}} handleItemChange={() => {}} />
      <Footer data={documentData} updateTotals={() => {}} />
      <button onClick={handleGeneratePDF} className="btn btn-secondary mt-4">
        Generate PDF
      </button>
    </div>
  );
}

export default StaticDocument;
