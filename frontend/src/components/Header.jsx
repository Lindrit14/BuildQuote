import React from 'react';

const Header = ({ data, type, handleChange }) => {
  return (
    <div className="mb-4">
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
          <p>{type === 'angebot' ? `Angebotsnr.: ${data.documentNumber}` : `Rechnungsnr.: ${data.documentNumber}`}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
