import React, { useEffect } from 'react';

const Footer = ({ data, updateTotals }) => {
  useEffect(() => {
    updateTotals();
  }, [data.items, updateTotals]);

  return (
    <div id='Footer' className="mt-4">
      <div className="flex justify-end">
        <div className="w-1/3">
          <div className="flex justify-between">
            <span>Summe Netto:</span>
            <span>€{data.netTotal ? data.netTotal.toFixed(2) : '0.00'}</span>
          </div>
          <div className="flex justify-between">
            <span>+20% MwSt.:</span>
            <span>€{data.vat ? data.vat.toFixed(2) : '0.00'}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Summe Brutto:</span>
            <span>€{data.grossTotal ? data.grossTotal.toFixed(2) : '0.00'}</span>
          </div>
        </div>
      </div>
      <footer className="mt-6">
        <p className="text-sm text-gray-600">{data.footerText}</p>
      </footer>
    </div>
  );
};

export default Footer;
