import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Project() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState(null);
  const [angebote, setAngebote] = useState([]);
  const [rechnungen, setRechnungen] = useState([]);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/project/${projectId}`, {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }
        const data = await response.json();
        setProjectData(data);
        setAngebote(data.angebote);
        setRechnungen(data.rechnungen);
        console.log(data.angebote)
        console.log(data.rechnungen)
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [projectId]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {projectData && (
        <>
          <h1 className="text-3xl font-bold mb-6">{projectData.projectName}</h1>
        
          <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-full max-w-4xl">
            <h2 className="text-2xl font-semibold mb-4">Your Documents</h2>
            <h3 className="text-xl font-semibold mb-2">Angebote</h3>
            <div className="space-y-4 mb-6">
              {angebote.map((doc) => (
                <div key={doc._id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div className="cursor-pointer">
                    <p><strong>Offer Number:</strong> {doc.offerNumber}</p>
                    <p><strong>Client Name:</strong> {doc.clientName}</p>
                    <p><strong>Project Location:</strong> {doc.projectLocation}</p>
                    <p><strong>Total:</strong> €{doc.grossTotal.toFixed(2)}</p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => navigate(`/editDocument/${doc._id}`, { state: { doc, type: 'angebot' } })} className="btn btn-info">Edit</button>
                    <button onClick={() => navigate(`/deleteDocument/${doc._id}`, { state: { doc, type: 'angebot' } })} className="btn btn-danger">Delete</button>
                    <button onClick={() => navigate(`/convertToRechnung/${doc._id}`, { state: { doc } })} className="btn btn-primary">Convert to Rechnung</button>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-xl font-semibold mb-2">Rechnungen</h3>
            <div className="space-y-4">
              {rechnungen.map((doc) => (
                <div key={doc._id} className="p-4 border rounded-lg flex justify-between items-center">
                  <div className="cursor-pointer">
                    <p><strong>Invoice Number:</strong> {doc.invoiceNumber}</p>
                    <p><strong>Client Name:</strong> {doc.clientName}</p>
                    <p><strong>Project Location:</strong> {doc.projectLocation}</p>
                    <p><strong>Total:</strong> €{doc.grossTotal.toFixed(2)}</p>
                  </div>
                  <div className="space-x-2">
                    <button onClick={() => navigate(`/editDocument/${doc._id}`, { state: { doc, type: 'rechnung' } })} className="btn btn-info">Edit</button>
                    <button onClick={() => navigate(`/deleteDocument/${doc._id}`, { state: { doc, type: 'rechnung' } })} className="btn btn-danger">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Project;
