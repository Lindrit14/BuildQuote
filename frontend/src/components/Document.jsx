// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Header from './Header';
import Leistungen from './Leistungen';
import Footer from './Footer';

// eslint-disable-next-line react/prop-types
function Document({ type }) {
  const [documentData, setDocumentData] = useState({
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    clientPhone: '',
    documentNumber: '',
    projectLocation: '',
    date: new Date().toLocaleDateString(),
    items: [],
    netTotal: 0,
    vat: 0,
    grossTotal: 0,
    companyName: 'Ramiz Prakaj',
    companyAddress: 'A-2301 Groß-Enzersdorf, Feldhofgasse 2a',
    companyContact: '+43 664 44 56 521, FliesenPrakaj@aon.at',
    footerText: 'Die Verrechnung erfolgt nach tatsächlichem Aufwand...',
  });

  const updateTotals = (items) => {
    const netTotal = items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
    const vat = netTotal * 0.20;
    const grossTotal = netTotal + vat;
    return { netTotal, vat, grossTotal };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocumentData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleAddItem = (newItem) => {
    const newItems = [...documentData.items, newItem];
    const totals = updateTotals(newItems);
    setDocumentData(prevState => ({ ...prevState, items: newItems, ...totals }));
  };

  const handleRemoveItem = (index) => {
    const newItems = documentData.items.filter((_, idx) => idx !== index);
    const totals = updateTotals(newItems);
    setDocumentData(prevState => ({ ...prevState, items: newItems, ...totals }));
  };

  const handleItemChange = (index, updatedItem) => {
    const newItems = [...documentData.items];
    newItems[index] = updatedItem;
    const totals = updateTotals(newItems);
    setDocumentData(prevState => ({ ...prevState, items: newItems, ...totals }));
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md flex flex-col w-full justify-center  ">
      <Header data={documentData} type={type} handleChange={handleChange} />
      <Leistungen
        items={documentData.items}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        handleItemChange={handleItemChange}
      />
      <Footer data={documentData} />
    </div>
  );
}

export default Document;
