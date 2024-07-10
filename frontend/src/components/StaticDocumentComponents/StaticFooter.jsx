import React from 'react';

const StaticFooter = ({ data }) => {
  return (
    <div className="mt-4">
      <div className="w-full flex flex-col items-end">
        <p className="text-left"><strong>Net Total:</strong> €{data.netTotal.toFixed(2)}</p>
        <p className="text-left"><strong>VAT (20%):</strong> €{data.vat.toFixed(2)}</p>
        <p className="text-left"><strong>Gross Total:</strong> €{data.grossTotal.toFixed(2)}</p>
      </div>
      <p>{data.footerText}</p>
    </div>
  );
};

export default StaticFooter;
