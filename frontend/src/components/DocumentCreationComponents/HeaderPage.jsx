import React, { useState } from 'react';
import SelectKundeModal from '../KundenComponents/SelectKundeModal';

const HeaderPage = ({ data, handleChange, nextStep, generateUniqueOfferNumber, setDocumentData }) => {
  const [showKundeModal, setShowKundeModal] = useState(false);

  const setSelectedKunde = (kunde) => {
    setDocumentData(prevState => ({
      ...prevState,
      clientName: kunde.name,
      clientAddress: kunde.address,
      clientEmail: kunde.email,
      clientPhone: kunde.phoneNumber,
    }));
    setShowKundeModal(false);
  };

  return (
    <div>
      <h2>Header Information</h2>
      <button onClick={() => setShowKundeModal(true)} className="btn btn-secondary mb-4">Select Kunde</button>
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
        name="projectLocation"
        value={data.projectLocation}
        onChange={handleChange}
        placeholder="Project Location"
        className="input input-bordered w-full mb-4"
      />
      <input
        type="text"
        name="offerNumber"
        value={data.offerNumber || generateUniqueOfferNumber()}
        onChange={handleChange}
        placeholder="Offer Number"
        className="input input-bordered w-full mb-4"
        readOnly
      />
      <input
        type="text"
        name="date"
        value={data.date}
        onChange={handleChange}
        placeholder="Date"
        className="input input-bordered w-full mb-4"
      />
      <button onClick={nextStep} className="btn btn-primary">Next</button>
      <SelectKundeModal show={showKundeModal} onClose={() => setShowKundeModal(false)} setSelectedKunde={setSelectedKunde} />
    </div>
  );
};

export default HeaderPage;
