import React, { useState, useEffect } from 'react';
import { getAllLeistungen, createLeistung } from '../../helper/api/leistungenAPICalls';

const SelectLeistungModal = ({ show, onClose, addItem }) => {
  const [leistungen, setLeistungen] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newLeistung, setNewLeistung] = useState({ title: '', detail: '', einheit: '', einheitspreis: '' });

  useEffect(() => {
    const loadLeistungen = async () => {
      try {
        const leistungenData = await getAllLeistungen();
        setLeistungen(leistungenData);
      } catch (error) {
        console.error('Error fetching Leistungen:', error);
      }
    };

    if (show) {
      loadLeistungen();
    }
  }, [show]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCreateLeistung = async () => {
    try {
      const createdLeistung = await createLeistung(newLeistung);
      setLeistungen([...leistungen, createdLeistung]);
      addItem(createdLeistung);
      setNewLeistung({ title: '', detail: '', einheit: '', einheitspreis: '' });
    } catch (error) {
      console.error('Error creating Leistung:', error);
    }
  };

  const filteredLeistungen = leistungen?.filter(leistung =>
    leistung.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    leistung.detail.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <dialog id="leistungenModal" className="modal" open={show}>
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">Select or Create Leistung</h3>
        <input
          type="text"
          placeholder="Search Leistung by Title or Detail"
          value={searchTerm}
          onChange={handleSearchChange}
          className="input input-bordered w-full mb-4"
        />
        <div className="max-h-64 overflow-y-auto mb-4">
          <ul>
            {filteredLeistungen?.map(leistung => (
              <li key={leistung._id} className="flex justify-between items-center mb-2">
                <span>{leistung.title} - {leistung.detail}</span>
                <button onClick={() => addItem(leistung)} className="btn btn-primary">Use this Leistung</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="collapse bg-base-200 mb-4">
          <input type="checkbox" className="peer" />
          <div className="collapse-title text-xl font-medium peer-checked:collapse-open">Create New Leistung</div>
          <div className="collapse-content">
            <input
              type="text"
              placeholder="Title"
              value={newLeistung.title}
              onChange={(e) => setNewLeistung({ ...newLeistung, title: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <textarea
              placeholder="Detail"
              value={newLeistung.detail}
              onChange={(e) => setNewLeistung({ ...newLeistung, detail: e.target.value })}
              className="input input-bordered w-full mb-4"
            ></textarea>
            <input
              type="text"
              placeholder="Einheit"
              value={newLeistung.einheit}
              onChange={(e) => setNewLeistung({ ...newLeistung, einheit: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <input
              type="number"
              placeholder="Einheitspreis"
              value={newLeistung.einheitspreis}
              onChange={(e) => setNewLeistung({ ...newLeistung, einheitspreis: e.target.value })}
              className="input input-bordered w-full mb-4"
            />
            <button onClick={handleCreateLeistung} className="btn btn-primary w-full">Create Leistung</button>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </dialog>
  );
};

export default SelectLeistungModal;
