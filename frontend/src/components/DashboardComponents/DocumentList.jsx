import React from 'react';

const DocumentList = ({ documents, type, handleDocumentClick, handleDeleteDocument, handleConvertToRechnung, handleOpenProjectModal }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-full max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">Your Documents</h2>
      <h3 className="text-xl font-semibold mb-2">{type === 'angebot' ? 'Angebote' : 'Rechnungen'}</h3>
      <div className="space-y-4 mb-6">
        {documents.map((doc) => (
          <div key={doc._id} className="p-4 border rounded-lg flex justify-between items-center">
            <div className="cursor-pointer">
              <p><strong>{type === 'angebot' ? 'Offer' : 'Invoice'} Number:</strong> {type === 'angebot' ? doc.offerNumber : doc.invoiceNumber}</p>
              <p><strong>Client Name:</strong> {doc.clientName}</p>
              <p><strong>Project Location:</strong> {doc.projectLocation}</p>
              <p><strong>Total:</strong> €{doc.grossTotal.toFixed(2)}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleDocumentClick(doc, type)} className="btn btn-info">Edit</button>
              <button onClick={() => handleDeleteDocument(doc, type)} className="btn btn-danger">Delete</button>
              {type === 'angebot' && <button onClick={() => handleConvertToRechnung(doc)} className="btn btn-primary">Convert to Rechnung</button>}
              <button onClick={() => handleOpenProjectModal(doc, type)} className="btn btn-secondary">Add to Project</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
