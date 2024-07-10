import React, { useEffect } from 'react';

const Header = ({ data, type, handleChange, generateUniqueOfferNumber }) => {
  useEffect(() => {
    if (!data.offerNumber && type === 'angebot') {
      handleChange({ target: { name: 'offerNumber', value: generateUniqueOfferNumber() } });
    }
    if (!data.invoiceNumber && type === 'rechnung') {
      handleChange({ target: { name: 'invoiceNumber', value: generateUniqueOfferNumber() } });
    }
  }, [data.offerNumber, data.invoiceNumber, handleChange, generateUniqueOfferNumber, type]);

  return (
    <div id='Header' className="mb-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-bold">{type === 'angebot' ? 'Angebot' : 'Rechnung'}</h1>
          <div className="mt-2">
            <input
              type="text"
              name="clientName"
              value={data.clientName}
              onChange={handleChange}
              placeholder="Client Name"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="clientAddress"
              value={data.clientAddress}
              onChange={handleChange}
              placeholder="Client Address"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              name="clientEmail"
              value={data.clientEmail}
              onChange={handleChange}
              placeholder="Client Email"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="tel"
              name="clientPhone"
              value={data.clientPhone}
              onChange={handleChange}
              placeholder="Client Phone"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold">{data.companyName}</h2>
          <p>{data.companyAddress}</p>
          <p>{data.companyContact}</p>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <p>{data.date}</p>
          <input
            type="text"
            name="projectLocation"
            value={data.projectLocation}
            onChange={handleChange}
            placeholder="Project Location"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <div>
          {type === 'rechnung' && (
            <>
              <input
                type="text"
                name="invoiceNumber"
                value={data.invoiceNumber}
                onChange={handleChange}
                placeholder="Invoice Number"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="date"
                name="dueDate"
                value={data.dueDate}
                onChange={handleChange}
                placeholder="Due Date"
                className="input input-bordered w-full max-w-xs"
              />
            </>
          )}
          {type === 'angebot' && (
            <input
              type="text"
              name="offerNumber"
              value={data.offerNumber}
              onChange={handleChange}
              placeholder="Offer Number"
              className="input input-bordered w-full max-w-xs"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
