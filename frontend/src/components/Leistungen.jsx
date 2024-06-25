// eslint-disable-next-line no-unused-vars
import React from 'react';
import Position from './Position';

// eslint-disable-next-line react/prop-types
const Leistungen = ({ items, handleAddItem, handleRemoveItem, handleItemChange }) => {
  return (
    <div id='Leistungen' className="mb-4">
      <div className="flex justify-between mb-4">
        <span>Pos.</span>
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
      <button type="button" onClick={handleAddItem} className="btn btn-primary mt-2">Add Item</button>
    </div>
  );
};

export default Leistungen;
