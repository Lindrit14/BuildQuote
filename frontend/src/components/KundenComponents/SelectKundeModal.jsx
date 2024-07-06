import React, { useState, useEffect } from 'react';
import { getAllKunden, createKunden } from '../../helper/api/kundenAPICalls';

const SelectKundeModal = ({ show, onClose, setSelectedKunde }) => {
  const [kunden, setKunden] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newKunde, setNewKunde] = useState({ name: '', address: '', plz: '', ort: '', email: '', phoneNumber: '', otherInfo: '' });

  useEffect(() => {
    const loadKunden = async () => {
      try {
        const kundenData = await getAllKunden();
        setKunden(kundenData);
      } catch (error) {
        console.error('Error fetching Kunden:', error);
      }
    };

    if (show) {
      loadKunden();
    }
  }, [show]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateKunde = async () => {
    try {
      const createdKunde = await createKunden(newKunde);
      setKunden([...kunden, createdKunde]);
      setSelectedKunde(createdKunde);
      setNewKunde({ name: '', address: '', plz: '', ort: '', email: '', phoneNumber: '', otherInfo: '' });
    } catch (error) {
      console.error('Error creating Kunde:', error);
    }
  };

  const filteredKunden = kunden.filter(kunde =>
    kunde.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kunde.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <dialog id="selectKundeModal" className="modal" open={show}>
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Select or Create Kunde</h3>
        <input
          type="text"
          placeholder="Search Kunde by Name or Address"
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full mb-4"
        />
        <div className="max-h-64 overflow-y-auto mb-4">
          <ul>
            {filteredKunden.map(kunde => (
              <li key={kunde._id} className="flex justify-between items-center mb-2">
                <span>{kunde.name} - {kunde.address}</span>
                <button onClick={() => setSelectedKunde(kunde)} className="btn btn-primary">Use this Kunde</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="collapse bg-base-200 mb-4">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-medium peer-checked:collapse-open">Create New Kunde</div>
          <div className="collapse-content">
            <input
              type="text"
              placeholder="Name"
              value={newKunde.name}
              onChange={(e) => setNewKunde({ ...newKunde, name: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <input
              type="text"
              placeholder="Address"
              value={newKunde.address}
              onChange={(e) => setNewKunde({ ...newKunde, address: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <input
              type="text"
              placeholder="PLZ"
              value={newKunde.plz}
              onChange={(e) => setNewKunde({ ...newKunde, plz: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <input
              type="text"
              placeholder="Ort"
              value={newKunde.ort}
              onChange={(e) => setNewKunde({ ...newKunde, ort: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <input
              type="email"
              placeholder="Email"
              value={newKunde.email}
              onChange={(e) => setNewKunde({ ...newKunde, email: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={newKunde.phoneNumber}
              onChange={(e) => setNewKunde({ ...newKunde, phoneNumber: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <textarea
              placeholder="Other Info"
              value={newKunde.otherInfo}
              onChange={(e) => setNewKunde({ ...newKunde, otherInfo: e.target.value })}
              className="input input-bordered w-full mb-4"
            ></textarea>
            <button onClick={handleCreateKunde} className="btn btn-primary w-full">Create Kunde</button>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  );
};

export default SelectKundeModal;
