import React from 'react';

const OverviewPage = ({ data, prevStep, handleSave }) => {
  return (
    <div>
      <h2>Overview</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={prevStep} className="btn btn-secondary">Back</button>
      <button onClick={handleSave} className="btn btn-primary">Save</button>
    </div>
  );
};

export default OverviewPage;
