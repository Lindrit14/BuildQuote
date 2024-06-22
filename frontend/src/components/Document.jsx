import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './Header';
import Leistungen from './Leistungen';
import Footer from './Footer';
import html2pdf from 'html2pdf.js';

// eslint-disable-next-line react/prop-types
function Document({ type }) {
  const [documentData, setDocumentData] = useState({
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    clientPhone: '',
    offerNumber: '',
    documentNumber: '',
    projectLocation: '',
    date: new Date().toLocaleDateString(),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/angebot/createAngebot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create Angebot');
      }
      alert(`${type === 'angebot' ? 'Angebot' : 'Rechnung'} has been saved successfully.`);
      console.log('Angebot created:', data);

      // Generate and download PDF
      const element = documentRef.current;
      html2pdf().from(element).save(`${type === 'angebot' ? 'Angebot' : 'Rechnung'}-${data.offerNumber}.pdf`);
      
    } catch (error) {
      console.error('Error creating Angebot:', error);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md flex flex-col w-full justify-center">
      <form onSubmit={handleSubmit} ref={documentRef}>
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
    </div>
  );
}

export default Document;
