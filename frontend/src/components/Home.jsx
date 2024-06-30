import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectModal from './ProjectModal';

function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    _id: '',
  });
  const [angebote, setAngebote] = useState([]);
  const [rechnungen, setRechnungen] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/getCurrentUser', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchDocuments = async () => {
      try {
        const responseAngebote = await fetch('http://localhost:5000/angebot/getAngebote', {
          credentials: 'include',
        });
        if (!responseAngebote.ok) {
          throw new Error('Failed to fetch Angebote');
        }
        const angeboteData = await responseAngebote.json();

        const responseRechnungen = await fetch('http://localhost:5000/rechnung/getRechnungen', {
          credentials: 'include',
        });
        if (!responseRechnungen.ok) {
          throw new Error('Failed to fetch Rechnungen');
        }
        const rechnungenData = await responseRechnungen.json();

        const responseProjects = await fetch('http://localhost:5000/project/getProjects', {
          credentials: 'include',
        });
        if (!responseProjects.ok) {
          throw new Error('Failed to fetch Projects');
        }
        const projectsData = await responseProjects.json();

        setAngebote(angeboteData);
        setRechnungen(rechnungenData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchUserData();
    fetchDocuments();
  }, []);

  const handleCreateAngebot = () => {
    navigate('/CreateAngebot');
  };

  const handleCreateRechnung = () => {
    navigate('/CreateRechnung');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUserUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to update user data');
      }
      const data = await response.json();
      console.log('User updated:', data);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleDocumentClick = (doc, type) => {
    navigate(`/editDocument/${doc._id}`, { state: { doc, type } });
  };

  const handleDeleteDocument = async (doc, type) => {
    try {
      const endpoint = type === 'angebot' ? `angebot/deleteAngebot/${doc._id}` : `rechnung/deleteRechnung/${doc._id}`;
      const response = await fetch(`http://localhost:5000/${endpoint}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete document');
      }
      alert(`${type === 'angebot' ? 'Angebot' : 'Rechnung'} has been deleted successfully.`);
      setAngebote(angebote.filter(item => item._id !== doc._id));
      setRechnungen(rechnungen.filter(item => item._id !== doc._id));
    } catch (error) {
      console.error(`Error deleting ${type === 'angebot' ? 'Angebot' : 'Rechnung'}:`, error);
    }
  };

  const handleConvertToRechnung = async (angebot) => {
    try {
      const response = await fetch(`http://localhost:5000/angebot/convertToRechnung/${angebot._id}`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to convert Angebot to Rechnung');
      }
      alert('Angebot has been converted to Rechnung successfully.');
      setRechnungen([...rechnungen, data]);
    } catch (error) {
      console.error('Error converting Angebot to Rechnung:', error);
    }
  };

  const handleCreateProject = async () => {
    try {
      const response = await fetch('http://localhost:5000/project/createProject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ projectName }),
        credentials: 'include',
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create project');
      }
      alert('Project created successfully.');
      setProjects([...projects, data]);
      setProjectName('');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleViewProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleOpenProjectModal = (doc, type) => {
    setCurrentDocument({ doc, type });
    setShowProjectModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Document</h2>
          <button
            onClick={handleCreateAngebot}
            className="btn btn-primary w-full mb-4"
          >
            Create Angebot
          </button>
          <button
            onClick={handleCreateRechnung}
            className="btn btn-secondary w-full"
          >
            Create Rechnung
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Edit User Information</h2>
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              placeholder="Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="input input-bordered w-full"
            />
            <input
              type="tel"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              placeholder="Phone"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="input input-bordered w-full"
            />
            <button
              onClick={handleUserUpdate}
              className="btn btn-success w-full"
            >
              Update Information
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
        <input
          type="text"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project Name"
          className="input input-bordered w-full mb-4"
        />
        <button onClick={handleCreateProject} className="btn btn-primary w-full mb-6">
          Create Project
        </button>
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-6 rounded-lg shadow-md mb-4">
            <h3 className="text-xl font-semibold mb-2">{project.projectName}</h3>
            <button onClick={() => handleViewProject(project._id)} className="btn btn-secondary">
              View Project
            </button>
          </div>
        ))}
      </div>
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
                <button onClick={() => handleDocumentClick(doc, 'angebot')} className="btn btn-info">Edit</button>
                <button onClick={() => handleDeleteDocument(doc, 'angebot')} className="btn btn-danger">Delete</button>
                <button onClick={() => handleConvertToRechnung(doc)} className="btn btn-primary">Convert to Rechnung</button>
                <button onClick={() => handleOpenProjectModal(doc, 'angebot')} className="btn btn-secondary">Add to Project</button>
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-xl font-semibold mb-2">Rechnungen</h3>
        <div className="space-y-4">
          {rechnungen.map((doc) => (
            <div key={doc._id} className="p-4 border rounded-lg flex justify-between items-center">
              <div onClick={() => handleDocumentClick(doc, 'rechnung')} className="cursor-pointer">
                <p><strong>Invoice Number:</strong> {doc.invoiceNumber}</p>
                <p><strong>Client Name:</strong> {doc.clientName}</p>
                <p><strong>Project Location:</strong> {doc.projectLocation}</p>
                <p><strong>Total:</strong> €{doc.grossTotal.toFixed(2)}</p>
              </div>
              <div className="space-x-2">
                <button onClick={() => handleDocumentClick(doc, 'rechnung')} className="btn btn-info">Edit</button>
                <button onClick={() => handleDeleteDocument(doc, 'rechnung')} className="btn btn-danger">Delete</button>
                <button onClick={() => handleOpenProjectModal(doc, 'rechnung')} className="btn btn-secondary">Add to Project</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {currentDocument && (
        <ProjectModal
          show={showProjectModal}
          onClose={() => setShowProjectModal(false)}
          onSave={() => {
            setShowProjectModal(false);
            alert('Document added to project successfully.');
          }}
          documentId={currentDocument.doc._id}
          documentType={currentDocument.type}
        />
      )}
    </div>
    
  );
}

export default Home;
