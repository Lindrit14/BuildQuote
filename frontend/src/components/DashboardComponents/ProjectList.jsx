import React, { useState } from 'react';

const ProjectList = ({ projects, handleCreateProject, handleViewProject }) => {
  const [projectName, setProjectName] = useState('');

  const handleCreate = () => {
    handleCreateProject(projectName);
    setProjectName('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6 w-full max-w-4xl">
      <h2 className="text-2xl font-semibold mb-4">Your Projects</h2>
      <input
        type="text"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        placeholder="Project Name"
        className="input input-bordered w-full mb-4"
      />
      <button onClick={handleCreate} className="btn btn-primary w-full mb-6">
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
  );
};

export default ProjectList;
