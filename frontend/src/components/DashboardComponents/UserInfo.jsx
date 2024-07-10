import React from 'react';

const UserInfo = ({ userData, handleInputChange, handleUserUpdate }) => (
  <div className="bg-white p-6 rounded-lg shadow-md w-full">
    <h2 className="text-2xl font-semibold mb-4">Edit User Information</h2>
    <div className="space-y-4">
      <input
        type="text"
        name="name"
        value={userData.name || ''}
        onChange={handleInputChange}
        placeholder="Name"
        className="input input-bordered w-full"
      />
      <input
        type="email"
        name="email"
        value={userData.email || ''}
        onChange={handleInputChange}
        placeholder="Email"
        className="input input-bordered w-full"
      />
      <input
        type="tel"
        name="phone"
        value={userData.phone || ''}
        onChange={handleInputChange}
        placeholder="Phone"
        className="input input-bordered w-full"
      />
      <input
        type="text"
        name="address"
        value={userData.address || ''}
        onChange={handleInputChange}
        placeholder="Address"
        className="input input-bordered w-full"
      />
      <button onClick={handleUserUpdate} className="btn btn-success w-full">
        Update Information
      </button>
    </div>
  </div>
);

export default UserInfo;
