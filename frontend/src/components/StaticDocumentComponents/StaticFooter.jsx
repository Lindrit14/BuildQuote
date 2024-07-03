import React from 'react';

const StaticFooter = ({ data }) => {
  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold">Summary</h2>
      <p><strong>Net Total:</strong> €{data.netTotal.toFixed(2)}</p>
      <p><strong>VAT (20%):</strong> €{data.vat.toFixed(2)}</p>
      <p><strong>Gross Total:</strong> €{data.grossTotal.toFixed(2)}</p>
      <p>{data.footerText}</p>
    </div>
  );
};

export default StaticFooter;
