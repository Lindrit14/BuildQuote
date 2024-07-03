// src/api.js

export const fetchUserData = async () => {
    const response = await fetch('http://localhost:5000/getCurrentUser', {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user data');
    }
    return response.json();
  };
  
  export const fetchAngebote = async () => {
    const response = await fetch('http://localhost:5000/angebot/getAngebote', {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch Angebote');
    }
    return response.json();
  };
  
  export const fetchRechnungen = async () => {
    const response = await fetch('http://localhost:5000/rechnung/getRechnungen', {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch Rechnungen');
    }
    return response.json();
  };
  
  export const fetchProjects = async () => {
    const response = await fetch('http://localhost:5000/project/getProjects', {
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch Projects');
    }
    return response.json();
  };
  
  export const logoutUser = async () => {
    const response = await fetch('http://localhost:5000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to logout');
    }
    return response.json();
  };
  
  export const createAngebot = async (data) => {
    const response = await fetch('http://localhost:5000/angebot/createAngebot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create Angebot');
    }
    return response.json();
  };
  
  export const createRechnung = async (data) => {
    const response = await fetch('http://localhost:5000/rechnung/createRechnung', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to create Rechnung');
    }
    return response.json();
  };

  export const updateUser = async (userData) => {
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
    return response.json();
  };

  export const convertToRechnung = async (angebotId) => {
    const response = await fetch(`http://localhost:5000/angebot/convertToRechnung/${angebotId}`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to convert Angebot to Rechnung');
    }
    return response.json();
  };

  export const deleteDocument = async (docId, type) => {
    const endpoint = type === 'angebot' ? `angebot/deleteAngebot/${docId}` : `rechnung/deleteRechnung/${docId}`;
    const response = await fetch(`http://localhost:5000/${endpoint}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to delete document');
    }
    return response.json();
  };

  export const createProject = async (projectName) => {
    const response = await fetch('http://localhost:5000/project/createProject', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectName }),
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to create project');
    }
    return response.json();
  };
  
  
  export const addDocumentToProject = async (projectId, documentId, documentType) => {
    const endpoint = documentType === 'angebot'
      ? `http://localhost:5000/project/addAngebotToProject/${projectId}/${documentId}`
      : `http://localhost:5000/project/addRechnungToProject/${projectId}/${documentId}`;
  
    const response = await fetch(endpoint, {
      method: 'POST',
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Failed to add document to project');
    }
    return response.json();
  };
  