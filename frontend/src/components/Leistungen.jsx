// eslint-disable-next-line no-unused-vars
import React from 'react';
import Position from './Position';

const Leistungen = ({ items, handleAddItem, handleRemoveItem, handleItemChange }) => {
  const addItem = () => {
    handleAddItem({
      position: items.length + 1,
      quantity: 0,
      unit: '',
      description: '',
      unitPrice: 0,
      total: 0,
    });
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span className='w-1/12'>Pos.</span>
        <span className='w-1/12'>Menge</span>
        <span className='w-1/12'>Einh.</span>
        <span className='w-1/2'>Beschreibung</span>
        <span className='w-1/12'>Einh.Preis</span>
        <span className='w-1/12'>Summe</span>
      </div>
      {items.map((item, index) => (
        <Position
          key={index}
          item={item}
          index={index}
          handleItemChange={handleItemChange}
          handleRemoveItem={handleRemoveItem}
        />
      ))}
      <button onClick={addItem} className="btn btn-primary mt-2">Add Item</button>
    </div>
  );
};

export default Leistungen;
