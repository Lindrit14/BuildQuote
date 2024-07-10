import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import StaticHeader from './StaticHeader';
import StaticLeistungen from './StaticLeistungen';
import StaticFooter from './StaticFooter';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

function StaticDocument() {
  const navigate = useNavigate();
  const location = useLocation();
  const { documentData, type } = location.state;
  const documentRef = useRef(null);

  const handleGeneratePDF = () => {
    window.print()
  };

  const handleNavigateBack = () => {
    navigate('/');
  };

  return (
    <div className="p-12 bg-white rounded-xl shadow-md flex flex-col h-screen w-full" ref={documentRef}>
      <button onClick={handleNavigateBack} className="btn btn-secondary mb-4">Back</button>
      <div id="innerDocument">
        <StaticHeader data={documentData} type={type} />
        <StaticLeistungen items={documentData.items} />
        <StaticFooter data={documentData} />
      </div>
      <button onClick={handleGeneratePDF} className="btn btn-secondary mt-4">
        Generate PDF
      </button>
    </div>
  );
}

export default StaticDocument;
