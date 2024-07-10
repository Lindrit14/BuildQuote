const API_URL = 'http://localhost:5000'; // Replace with your actual backend URL

export const createKunden = async (kundenData) => {
  try {
    const response = await fetch(`${API_URL}/kunden/createKunden`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(kundenData),
    });
    if (!response.ok) {
      throw new Error('Failed to create Kunden');
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating Kunden:', error);
    throw error;
  }
};

export const getAllKunden = async () => {
  try {
    const response = await fetch(`${API_URL}/kunden/getAllKunden`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch Kunden');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Kunden:', error);
    throw error;
  }
};

export const getKundenById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/kunden/getKundenById/${id}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch Kunden');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Kunden:', error);
    throw error;
  }
};

export const updateKunden = async (id, kundenData) => {
  try {
    const response = await fetch(`${API_URL}/kunden/updateKunden/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(kundenData),
    });
    if (!response.ok) {
      throw new Error('Failed to update Kunden');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating Kunden:', error);
    throw error;
  }
};

export const deleteKunden = async (id) => {
  try {
    const response = await fetch(`${API_URL}/kunden/deleteKunden/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to delete Kunden');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting Kunden:', error);
    throw error;
  }
};
