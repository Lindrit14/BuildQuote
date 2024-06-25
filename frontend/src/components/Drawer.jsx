import React from 'react';
import html2pdf from 'html2pdf.js';

const Drawer = ({ document, onClose }) => {
  const handleDownload = () => {
    const element = document.getElementById('document-view');
    const opt = {
      margin: 1,
      filename: `${document.offerNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };
    html2pdf().from(element).set(opt).save();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-end">
      <div className="w-1/3 bg-white p-4 shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600">
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Document Options</h2>
        <button onClick={() => window.location.href = `/view/${document._id}`} className="btn btn-primary w-full mb-2">See</button>
        <button onClick={() => window.location.href = `/edit/${document._id}`} className="btn btn-secondary w-full mb-2">Edit</button>
        <button onClick={handleDownload} className="btn btn-success w-full mb-4">Download</button>
        <div id="document-view" className="p-4 border rounded hidden">
          <h3 className="text-xl font-bold mb-2">Offer Number: {document.offerNumber}</h3>
          <p><strong>Client Name:</strong> {document.clientName}</p>
          <p><strong>Client Address:</strong> {document.clientAddress}</p>
          <p><strong>Client Email:</strong> {document.clientEmail}</p>
          <p><strong>Client Phone:</strong> {document.clientPhone}</p>
          <p><strong>Project Location:</strong> {document.projectLocation}</p>
          <p><strong>Date:</strong> {document.date}</p>
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Items</h4>
            {document.items.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{item.position}</span>
                <span>{item.quantity}</span>
                <span>{item.unit}</span>
                <span>{item.description}</span>
                <span>€{item.unitPrice.toFixed(2)}</span>
                <span>€{item.total.toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <p><strong>Net Total:</strong> €{document.netTotal.toFixed(2)}</p>
            <p><strong>VAT:</strong> €{document.vat.toFixed(2)}</p>
            <p><strong>Gross Total:</strong> €{document.grossTotal.toFixed(2)}</p>
          </div>
          <div className="mt-4">
            <p><strong>Company Name:</strong> {document.companyName}</p>
            <p><strong>Company Address:</strong> {document.companyAddress}</p>
            <p><strong>Company Contact:</strong> {document.companyContact}</p>
          </div>
          <div className="mt-4">
            <p>{document.footerText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
