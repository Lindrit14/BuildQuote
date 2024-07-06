import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProjectModal from './ProjectModal';
import LogoutButton from '../LogoutButton';
import UserInfo from './UserInfo';
import ProjectList from './ProjectList';
import DocumentList from './DocumentList';
import {
  fetchUserData,
  fetchAngebote,
  fetchRechnungen,
  fetchProjects,
  updateUser,
  deleteDocument,
  convertToRechnung,
  createProject
} from '../../helper/api/apiCalls';

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
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await fetchUserData();
        const angeboteData = await fetchAngebote();
        const rechnungenData = await fetchRechnungen();
        const projectsData = await fetchProjects();

        setUserData(userData);
        setAngebote(angeboteData);
        setRechnungen(rechnungenData);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleFirstCreateAngebot = () => {
    navigate('/CreateAngebot');
  };

  const handleFirstCreateRechnung = () => {
    navigate('/CreateAngebot');
  };

  const handleCreateAngebot = () => {
    navigate('/documentWizard/angebot');
  };

  const handleCreateRechnung = () => {
    navigate('/documentWizard/rechnung');
  };

  const handleCreateKunden = () => {
    navigate('/CreateKunde');
  };

  const handleCreateLeistung = () => {
    navigate('/CreateLeistung');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleUserUpdate = async () => {
    try {
      await updateUser(userData);
      alert('User updated successfully.');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleDocumentClick = (doc, type) => {
    navigate(`/editDocument/${doc._id}`, { state: { doc, type } });
  };

  const handleDeleteDocument = async (doc, type) => {
    try {
      await deleteDocument(doc._id, type);
      alert(`${type === 'angebot' ? 'Angebot' : 'Rechnung'} has been deleted successfully.`);
      setAngebote(angebote.filter(item => item._id !== doc._id));
      setRechnungen(rechnungen.filter(item => item._id !== doc._id));
    } catch (error) {
      console.error(`Error deleting ${type === 'angebot' ? 'Angebot' : 'Rechnung'}:`, error);
    }
  };

  const handleConvertToRechnung = async (angebot) => {
    try {
      const rechnung = await convertToRechnung(angebot._id);
      alert('Angebot has been converted to Rechnung successfully.');
      setRechnungen([...rechnungen, rechnung]);
    } catch (error) {
      console.error('Error converting Angebot to Rechnung:', error);
    }
  };

  const handleCreateProject = async (projectName) => {
    try {
      const project = await createProject(projectName);
      alert('Project created successfully.');
      setProjects([...projects, project]);
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
      <LogoutButton />
      <h1 className="text-3xl font-bold mb-6">Welcome to the Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Create Document</h2>
          <button onClick={handleFirstCreateAngebot} className="btn btn-primary w-full mb-4">
            Create Angebot
          </button>
          <button onClick={handleFirstCreateRechnung} className="btn btn-secondary w-full mb-4">
            Create Rechnung
          </button>
          <button onClick={handleCreateAngebot} className="btn btn-primary w-full mb-4">
            Create Angebot
          </button>
          <button onClick={handleCreateRechnung} className="btn btn-secondary w-full mb-4">
            Create Rechnung
          </button>
          <button onClick={handleCreateKunden} className="btn btn-secondary w-full mb-4">
            Create Kunden
          </button>
          <button onClick={handleCreateLeistung} className="btn btn-secondary w-full">
            Create Leistung
          </button>
        </div>
        <UserInfo userData={userData} handleInputChange={handleInputChange} handleUserUpdate={handleUserUpdate} />
      </div>
      <ProjectList projects={projects} handleCreateProject={handleCreateProject} handleViewProject={handleViewProject} />
      <DocumentList
        documents={angebote}
        type="angebot"
        handleDocumentClick={handleDocumentClick}
        handleDeleteDocument={handleDeleteDocument}
        handleConvertToRechnung={handleConvertToRechnung}
        handleOpenProjectModal={handleOpenProjectModal}
      />
      <DocumentList
        documents={rechnungen}
        type="rechnung"
        handleDocumentClick={handleDocumentClick}
        handleDeleteDocument={handleDeleteDocument}
        handleOpenProjectModal={handleOpenProjectModal}
      />
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
