import React from 'react';

const StaticLeistungen = ({ items }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold">Leistungen</h2>
      {items.map((item, index) => (
        <div key={index} className="mb-2">
          <p><strong>Position:</strong> {item.position}</p>
          <p><strong>Quantity:</strong> {item.quantity}</p>
          <p><strong>Unit:</strong> {item.unit}</p>
          <p><strong>Description:</strong> {item.description}</p>
          <p><strong>Unit Price:</strong> €{item.unitPrice.toFixed(2)}</p>
          <p><strong>Total:</strong> €{item.total.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default StaticLeistungen;
