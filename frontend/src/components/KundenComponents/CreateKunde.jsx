import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createKunden } from '../../helper/api/kundenAPICalls';

const CreateKunden = () => {
  const [kundenData, setKundenData] = useState({
    name: '',
    address: '',
    plz: '',
    ort: '',
    email: '',
    phoneNumber: '',
    otherInfo: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setKundenData({ ...kundenData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createKunden(kundenData);
      alert('Kunden created successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error creating Kunden:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Create Kunden</h1>
      <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={kundenData.name}
          onChange={handleChange}
          placeholder="Name"
          className="input input-bordered w-full mb-4"
        />
        <input
          type="text"
          name="address"
          value={kundenData.address}
          onChange={handleChange}
          placeholder="Address"
          className="input input-bordered w-full mb-4"
        />
        <input
          type="text"
          name="plz"
          value={kundenData.plz}
          onChange={handleChange}
          placeholder="PLZ"
          className="input input-bordered w-full mb-4"
        />
        <input
          type="text"
          name="ort"
          value={kundenData.ort}
          onChange={handleChange}
          placeholder="Ort"
          className="input input-bordered w-full mb-4"
        />
        <input
          type="email"
          name="email"
          value={kundenData.email}
          onChange={handleChange}
          placeholder="Email"
          className="input input-bordered w-full mb-4"
        />
        <input
          type="text"
          name="phoneNumber"
          value={kundenData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="input input-bordered w-full mb-4"
        />
        <textarea
          name="otherInfo"
          value={kundenData.otherInfo}
          onChange={handleChange}
          placeholder="Other Info"
          className="input input-bordered w-full mb-4"
        ></textarea>
        <button type="submit" className="btn btn-primary w-full">
          Create Kunden
        </button>
      </form>
    </div>
  );
};

export default CreateKunden;
