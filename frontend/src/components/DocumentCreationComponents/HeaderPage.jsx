import React, { useEffect } from 'react';

const HeaderPage = ({ data, handleChange, nextStep, generateUniqueOfferNumber }) => {
  useEffect(() => {
    if (!data.offerNumber) {
      handleChange({
        target: {
          name: 'offerNumber',
          value: generateUniqueOfferNumber(),
        },
      });
    }
    // Set the current date if not already set
    if (!data.date) {
      handleChange({
        target: {
          name: 'date',
          value: new Date().toLocaleDateString(),
        },
      });
    }
  }, [data.offerNumber, data.date, generateUniqueOfferNumber, handleChange]);

  return (
    <div>
      <h2>Header Information</h2>
      <input
        type="text"
        name="offerNumber"
        value={data.offerNumber}
        onChange={handleChange}
        placeholder="Offer Number"
        className="input input-bordered w-full mb-4"
        disabled
      />
      <input
        type="text"
        name="projectLocation"
        value={data.projectLocation}
        onChange={handleChange}
        placeholder="Project Location"
        className="input input-bordered w-full mb-4"
      />
      <input
        type="text"
        name="clientName"
        value={data.clientName}
        onChange={handleChange}
        placeholder="Client Name"
        className="input input-bordered w-full mb-4"
      />
      <input
        type="text"
        name="clientAddress"
        value={data.clientAddress}
        onChange={handleChange}
        placeholder="Client Address"
        className="input input-bordered w-full mb-4"
      />
      <input
        type="email"
        name="clientEmail"
        value={data.clientEmail}
        onChange={handleChange}
        placeholder="Client Email"
        className="input input-bordered w-full mb-4"
      />
      <input
        type="tel"
        name="clientPhone"
        value={data.clientPhone}
        onChange={handleChange}
        placeholder="Client Phone"
        className="input input-bordered w-full mb-4"
      />
      <input
        type="text"
        name="date"
        value={data.date}
        onChange={handleChange}
        placeholder="Date"
        className="input input-bordered w-full mb-4"
        disabled
      />
      <button onClick={nextStep} className="btn btn-primary">Next</button>
    </div>
  );
};

export default HeaderPage;
