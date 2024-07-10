import React from 'react';

const StaticHeader = ({ data, type }) => {
  // Dynamically creating variables
  const {
    clientName,
    clientAddress,
    clientEmail,
    clientPhone,
    companyAddress,
    companyContact,
    companyName,
    date,
    offerNumber,
    projectLocation,
    invoiceNumber,
    dueDate
  } = data;

  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold">{type === 'angebot' ? 'Angebot' : 'Rechnung'}</h1>

<div className='flex justify-between mb-5'>
  <div>
      <p><strong></strong> {clientName}</p>
      <p><strong></strong> {clientAddress}</p>
      <p><strong></strong> {clientEmail}</p>
      <p><strong></strong> {clientPhone}</p>
  </div>

    <div>
      <p><strong></strong> {companyName}</p>
      <p><strong></strong> {companyAddress}</p>
      <p><strong></strong> {companyContact}</p>
    </div>
    </div>



      <p><strong>{type === 'angebot' ? 'Offer' : 'Invoice'} Number:</strong> {offerNumber || invoiceNumber}</p>
      <p><strong>Project:</strong> {projectLocation}</p>
      <p><strong>Date:</strong> {date}</p>
      {type === 'rechnung' && <p><strong>Due Date:</strong> {dueDate}</p>}
      {type === 'rechnung' && <p><strong>Invoice Number:</strong> {invoiceNumber}</p>}
      <div className="divider divider-neutral"></div>

    </div>
  );
};

export default StaticHeader;
