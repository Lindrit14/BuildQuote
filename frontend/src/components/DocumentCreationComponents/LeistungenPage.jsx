import React from 'react';
import Leistungen from '../Leistungen';

const LeistungenPage = ({ data, handleAddItem, handleRemoveItem, handleItemChange, nextStep, prevStep }) => {
  return (
    <div>
      <h2>Leistungen</h2>
      <Leistungen
        items={data.items}
        handleAddItem={handleAddItem}
        handleRemoveItem={handleRemoveItem}
        handleItemChange={handleItemChange}
      />
      <button onClick={prevStep} className="btn btn-secondary">Back</button>
      <button onClick={nextStep} className="btn btn-primary">Next</button>
    </div>
  );
};

export default LeistungenPage;
