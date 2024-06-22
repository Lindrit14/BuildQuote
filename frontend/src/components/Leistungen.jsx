import React from 'react';
import Position from './Position';

const Leistungen = ({ items, handleAddItem, handleRemoveItem, handleItemChange }) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-2">
        <span>Pos.</span>
        <span>Menge</span>
        <span>Einh.</span>
        <span>Beschreibung</span>
        <span>Einh.Preis</span>
        <span>Summe</span>
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
      <button onClick={handleAddItem} className="btn btn-primary mt-2">Add Item</button>
    </div>
  );
};

export default Leistungen;
