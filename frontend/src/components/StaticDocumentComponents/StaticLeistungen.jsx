import React from 'react';

const StaticLeistungen = ({ items }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold">Leistungen</h2>

      <div className="flex justify-between mb-4 font-semibold">
        <span>Pos.</span>
        <span className='w-1/12'>Menge</span>
        <span className='w-1/12'>Einh.</span>
        <span className='w-1/2'>Beschreibung</span>
        <span className='w-1/12'>Einh.Preis</span>
        <span className='w-1/12'>Summe</span>
      </div>
      {items.map((item, index) => (
        <div key={index} className="flex justify-between mb-2">
          <span>{item.position}</span>
          <span className='w-1/12'>{item.quantity}</span>
          <span className='w-1/12'>{item.unit}</span>
          <span className='w-1/2'>{item.description}</span>
          <span className='w-1/12'>€{item.unitPrice.toFixed(2)}</span>
          <span className='w-1/12'>€{(item.quantity * item.unitPrice).toFixed(2)}</span>

        </div>
      ))}
            <div className="divider divider-neutral"></div>

    </div>
  );
};

export default StaticLeistungen;
