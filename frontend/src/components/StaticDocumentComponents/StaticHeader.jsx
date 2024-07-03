import React from 'react';

const StaticHeader = ({ data, type }) => {
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold">{type === 'angebot' ? 'Angebot' : 'Rechnung'}</h1>
      <p><strong>Client Name:</strong> {data.clientName}</p>
      <p><strong>Client Address:</strong> {data.clientAddress}</p>
      <p><strong>Client Email:</strong> {data.clientEmail}</p>
      <p><strong>Client Phone:</strong> {data.clientPhone}</p>
      <p><strong>{type === 'angebot' ? 'Offer' : 'Invoice'} Number:</strong> {data.offerNumber || data.invoiceNumber}</p>
      <p><strong>Project Location:</strong> {data.projectLocation}</p>
      <p><strong>Date:</strong> {data.date}</p>
      {type === 'rechnung' && <p><strong>Due Date:</strong> {data.dueDate}</p>}
      {type === 'rechnung' && <p><strong>Invoice Number:</strong> {data.invoiceNumber}</p>}
    </div>
  );
};

export default StaticHeader;
