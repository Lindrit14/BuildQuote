import React from 'react';

const Footer = ({ data }) => {
  return (
    <div className="mt-4">
      <div className="flex justify-end">
        <div className="w-1/3">
          <div className="flex justify-between">
            <span>Summe Netto:</span>
            <span>€{data.netTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>+20% MwSt.:</span>
            <span>€{data.vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Summe Brutto:</span>
            <span>€{data.grossTotal.toFixed(2)}</span>
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
