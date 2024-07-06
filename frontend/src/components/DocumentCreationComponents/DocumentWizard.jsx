import React, { useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderPage from './HeaderPage';
import LeistungenPage from './LeistungenPage';
import FooterPage from './FooterPage';
import OverviewPage from './OverViewPage';

function DocumentWizard() {
  const { type } = useParams(); // Get the document type from URL parameters
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [documentData, setDocumentData] = useState({
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    clientPhone: '',
    offerNumber: '',
    documentNumber: '',
    projectLocation: '',
    date: '',
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

  const handleSave = async () => {
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
      navigate('/staticDocument', { state: { documentData, type } });
    } catch (error) {
      console.error(`Error creating ${type === 'angebot' ? 'Angebot' : 'Rechnung'}:`, error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  switch (step) {
    case 1:
      return <HeaderPage data={documentData} handleChange={handleChange} nextStep={nextStep} generateUniqueOfferNumber={generateUniqueOfferNumber} />;
    case 2:
      return <LeistungenPage data={documentData} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} handleItemChange={handleItemChange} nextStep={nextStep} prevStep={prevStep} />;
    case 3:
      return <FooterPage data={documentData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} updateTotals={updateTotals} />;
    case 4:
      return <OverviewPage data={documentData} prevStep={prevStep} handleSave={handleSave} />;
    default:
      return <HeaderPage data={documentData} handleChange={handleChange} nextStep={nextStep} generateUniqueOfferNumber={generateUniqueOfferNumber} />;
  }
}

export default DocumentWizard;
