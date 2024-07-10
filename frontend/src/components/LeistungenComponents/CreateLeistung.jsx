import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createLeistung } from '../../helper/api/leistungenAPICalls';

const CreateLeistung = () => {
  const [leistungData, setLeistungData] = useState({
    leistungTitel: '',
    leistungDetail: '',
    leistungEinheit: '',
    leistungEinheitspreis: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeistungData({ ...leistungData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createLeistung(leistungData);
      alert('Leistung created successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error creating Leistung:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Create Leistung</h1>
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <input
          type="text"
          name="leistungTitel"
          value={leistungData.leistungTitel}
          onChange={handleChange}
          placeholder="Leistung Titel"
          className="input input-bordered w-full mb-4"
        />
        <textarea
          name="leistungDetail"
          value={leistungData.leistungDetail}
          onChange={handleChange}
          placeholder="Leistung Detail"
          className="input input-bordered w-full mb-4"
        ></textarea>
        <input
          type="text"
          name="leistungEinheit"
          value={leistungData.leistungEinheit}
          onChange={handleChange}
          placeholder="Leistung Einheit"
          className="input input-bordered w-full mb-4"
        />
        <input
          type="number"
          name="leistungEinheitspreis"
          value={leistungData.leistungEinheitspreis}
          onChange={handleChange}
          placeholder="Leistung Einheitspreis"
          className="input input-bordered w-full mb-4"
        />
        <button type="submit" className="btn btn-primary w-full">
          Create Leistung
        </button>
      </form>
    </div>
  );
};

export default CreateLeistung;
    