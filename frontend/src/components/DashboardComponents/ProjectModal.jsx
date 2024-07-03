import React, { useEffect, useState } from 'react';

const ProjectModal = ({ show, onClose, onSave, documentId, documentType }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/project/getProjects', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    if (show) {
      fetchProjects();
    }
  }, [show]);

  const handleSave = async (projectId) => {
    try {
      const endpoint = documentType === 'angebot' ? 
        `http://localhost:5000/project/addAngebotToProject/${projectId}/${documentId}` :
        `http://localhost:5000/project/addRechnungToProject/${projectId}/${documentId}`;
  
      console.log('Posting to endpoint:', endpoint);
  
      const response = await fetch(endpoint, {
        method: 'POST',
        credentials: 'include',
      });
  
      const data = await response.json();
      console.log('Response:', data);
  
      if (!response.ok) {
        throw new Error('Failed to add document to project');
      }
      onSave();
    } catch (error) {
      console.error('Error adding document to project:', error);
    }
  };

  return (
    <div className={`fixed inset-0 z-50 ${show ? 'block' : 'hidden'}`}>
      <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Select Project</h2>
          <ul className="mb-4">
            {projects.map((project) => (
              <li key={project._id} className="mb-2">
                <button
                  onClick={() => handleSave(project._id)}
                  className="btn btn-primary w-full"
                >
                  {project.projectName}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={onClose} className="btn btn-secondary w-full">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
