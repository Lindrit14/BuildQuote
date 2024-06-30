// src/components/EditDocument.jsx

// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Leistungen from './Leistungen';
import Footer from './Footer';

function EditDocument() {
  const location = useLocation();
  const navigate = useNavigate();
  const { doc, type } = location.state;
  const [documentData, setDocumentData] = useState({
    ...doc,
    vat: doc.vat || 0,
    companyName: '',
    companyAddress: '',
    companyContact: '',
  });
  const documentRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getCurrentUser', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setDocumentData((prevState) => ({
          ...prevState,
          companyName: data.name,
          companyAddress: data.address,
          companyContact: data.email, // Assuming email as contact for simplicity
        }));
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('documentData');
    if (savedData) {
      setDocumentData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('documentData', JSON.stringify(documentData));
  }, [documentData]);

  const updateTotals = useCallback(() => {
    const netTotal = documentData.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    const vat = netTotal * 0.20;
    const grossTotal = netTotal + vat;
    setDocumentData((prevState) => ({
      ...prevState,
      netTotal,
      vat,
      grossTotal
    }));
  }, [documentData.items]);

  useEffect(() => {
    updateTotals();
  }, [documentData.items, updateTotals]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocumentData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleAddItem = () => {
    const newItem = {
      position: documentData.items.length + 1,
      quantity: 0,
      unit: '',
      description: '',
      unitPrice: 0,
      total: 0,
    };
    const newItems = [...documentData.items, newItem];
    setDocumentData((prevState) => ({ ...prevState, items: newItems }));
  };

  const handleRemoveItem = (index) => {
    const newItems = documentData.items.filter((_, idx) => idx !== index);
    setDocumentData((prevState) => ({ ...prevState, items: newItems }));
  };

  const handleItemChange = (index, updatedItem) => {
    const newItems = [...documentData.items];
    newItems[index] = updatedItem;
    setDocumentData((prevState) => ({ ...prevState, items: newItems }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const endpoint = type === 'angebot' ? `angebot/updateAngebot/${doc._id}` : `rechnung/updateRechnung/${doc._id}`;
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update document');
      }
      alert(`${type === 'angebot' ? 'Angebot' : 'Rechnung'} has been updated successfully.`);
      setIsSaved(true);
      console.log('Document updated:', data);

      localStorage.removeItem('documentData');

      // Navigate to StaticDocument with document data
      navigate('/staticDocument', { state: { documentData, type } });
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleNavigateBack = () => {
    if (!isSaved) {
      const confirmLeave = window.confirm("You have unsaved changes. Are you sure you want to leave?");
      if (!confirmLeave) return;
    }
    navigate('/');
  };

  return (
    <div className="p-12 bg-white rounded-xl shadow-md flex flex-col h-screen w-3/4">
      <button onClick={handleNavigateBack} className="btn btn-secondary mb-4">Back</button>
      <form className='flex flex-col h-full justify-around' onSubmit={handleSave} ref={documentRef}>
        <Header
          data={documentData}
          type={type}
          handleChange={handleChange}
        />
        <Leistungen
          items={documentData.items}
          handleAddItem={handleAddItem}
          handleRemoveItem={handleRemoveItem}
          handleItemChange={handleItemChange}
        />
        <Footer data={documentData} updateTotals={updateTotals} />
        <button type="submit" className="btn btn-primary mt-4">
          Save {type === 'angebot' ? 'Angebot' : 'Rechnung'}
        </button>
      </form>
    </div>
  );
}

export default EditDocument;
