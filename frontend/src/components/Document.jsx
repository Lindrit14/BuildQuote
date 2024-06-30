// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Leistungen from './Leistungen';
import Footer from './Footer';
import ProjectModal from './ProjectModal';

// eslint-disable-next-line react/prop-types
function Document({ type }) {
  const navigate = useNavigate();
  const [documentData, setDocumentData] = useState({
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    clientPhone: '',
    offerNumber: '',
    documentNumber: '',
    projectLocation: '',
    date: new Date().toLocaleDateString(),
    dueDate: type === 'rechnung' ? '' : undefined,
    invoiceNumber: type === 'rechnung' ? '' : undefined,
    items: [],
    netTotal: 0,
    vat: 0,
    grossTotal: 0,
    companyName: '',
    companyAddress: '',
    companyContact: '',
    footerText: 'Die Verrechnung erfolgt nach tatsächlichem Aufwand...',
  });
  const documentRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showProjectModal, setShowProjectModal] = useState(false);

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

  const generateUniqueOfferNumber = () => {
    return Date.now().toString();
  };

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
      const endpoint = type === 'angebot' ? 'angebot/createAngebot' : 'rechnung/createRechnung';
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Failed to create ${type === 'angebot' ? 'Angebot' : 'Rechnung'}`);
      }
      alert(`${type === 'angebot' ? 'Angebot' : 'Rechnung'} has been saved successfully.`);
      setIsSaved(true);
      navigate('/staticDocument', { state: { documentData, type } });
    } catch (error) {
      console.error(`Error creating ${type === 'angebot' ? 'Angebot' : 'Rechnung'}:`, error);
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
          generateUniqueOfferNumber={generateUniqueOfferNumber}
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
      <button onClick={() => setShowProjectModal(true)} className="btn btn-secondary mt-4">
        Add to Project
      </button>
      <ProjectModal
        show={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSave={() => {
          setShowProjectModal(false);
          alert('Document added to project successfully.');
        }}
        documentId={documentData._id}
        documentType={type}
      />
    </div>
  );
}

export default Document;