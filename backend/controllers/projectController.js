// controllers/projectController.js
const Project = require('../models/Project');
const Angebot = require('../models/angebot');
const Rechnung = require('../models/rechnung');

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { projectName } = req.body;
    const newProject = new Project({
      projectName,
      user: req.user._id
    });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all projects for a user
exports.getAllProjectsForUser = async (req, res) => {
  try {
    const projects = await Project.find({ user: req.user._id }).populate('angebote').populate('rechnungen');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve projects", details: error });
  }
};

// Add an Angebot to a Project
exports.addAngebotToProject = async (req, res) => {
    try {
      const { projectId, angebotId } = req.params;
      console.log('Received request to add Angebot to project:', { projectId, angebotId });
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      project.angebote.push(angebotId);
      await project.save();
      res.status(200).json(project);
    } catch (error) {
      console.error('Error adding Angebot to project:', error);
      res.status(400).json({ message: error.message });
    }
  };
  
  // Add a Rechnung to a Project
  exports.addRechnungToProject = async (req, res) => {
    try {
      const { projectId, rechnungId } = req.params;
      console.log('Received request to add Rechnung to project:', { projectId, rechnungId });
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      project.rechnungen.push(rechnungId);
      await project.save();
      res.status(200).json(project);
    } catch (error) {
      console.error('Error adding Rechnung to project:', error);
      res.status(400).json({ message: error.message });
    }
  };

exports.getProjectById = async (req, res) => {
    try {
      const { id } = req.params;
      const project = await Project.findById(id).populate('angebote rechnungen');
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching project data', error });
    }
  };