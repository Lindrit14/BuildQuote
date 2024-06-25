import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    _id: '',
  });
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    // Fetch user data from the server
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getCurrentUser', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:5000/angebot/getAngebote', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch documents');
        }
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchUserData();
    fetchDocuments();
  }, []);

  const handleCreateAngebot = () => {
    navigate('/CreateAngebot');
  };

  const handleCreateRechnung = () => {
    navigate('/CreateRechnung');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUserUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      const data = await response.json();
      console.log('User updated:', data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleDocumentClick = (doc) => {
    navigate(`/editDocument/${doc._id}`, { state: { doc, type: doc.type } });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Document</h2>
          <button
            onClick={handleCreateAngebot}
            className="btn btn-primary w-full mb-4"
          >
            Create Angebot
          </button>
          <button
            onClick={handleCreateRechnung}
            className="btn btn-secondary w-full"
          >
            Create Rechnung
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Edit User Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="input input-bordered w-full"
            />
            <button
              onClick={handleUserUpdate}
              className="btn btn-success w-full"
            >
              Update Information
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Your Documents</h2>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div 
              key={doc._id} 
              className="p-4 border rounded-lg cursor-pointer" 
              onClick={() => handleDocumentClick(doc)}
            >
              <p><strong>Offer Number:</strong> {doc.offerNumber}</p>
              <p><strong>Client Name:</strong> {doc.clientName}</p>
              <p><strong>Project Location:</strong> {doc.projectLocation}</p>
              <p><strong>Total:</strong> €{doc.grossTotal.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
