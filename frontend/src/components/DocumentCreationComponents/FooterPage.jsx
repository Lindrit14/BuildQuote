import React, { useEffect } from 'react';

const FooterPage = ({ data, handleChange, nextStep, prevStep, updateTotals }) => {
  useEffect(() => {
    updateTotals();
  }, [data.items, updateTotals]);

  return (
    <div>
      <h2>Footer Information</h2>
      <textarea
        name="footerText"
        value={data.footerText}
        onChange={handleChange}
        placeholder="Footer Text"
        className="input input-bordered w-full mb-4"
      ></textarea>
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
      <button onClick={prevStep} className="btn btn-secondary">Back</button>
      <button onClick={nextStep} className="btn btn-primary">Next</button>
    </div>
  );
};

export default FooterPage;
