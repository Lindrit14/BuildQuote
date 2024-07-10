const API_URL = 'http://localhost:5000'; // Replace with your actual backend URL

export const createLeistung = async (leistungData) => {
  try {
    const response = await fetch(`${API_URL}/leistung/createLeistung`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(leistungData),
    });
    if (!response.ok) {
      throw new Error('Failed to create Leistung');
    }
    console.log(response.json)
    return await response.json();
  } catch (error) {
    console.error('Error creating Leistung:', error);
    throw error;
  }
};

export const getAllLeistungen = async () => {
  try {
    const response = await fetch(`${API_URL}/leistung/getAllLeistungen`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch Leistungen');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Leistungen:', error);
    throw error;
  }
};

export const getLeistungById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/leistung/getLeistungById/${id}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to fetch Leistung');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching Leistung:', error);
    throw error;
  }
};

export const updateLeistung = async (id, leistungData) => {
  try {
    const response = await fetch(`${API_URL}/leistung/updateLeistung/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(leistungData),
    });
    if (!response.ok) {
      throw new Error('Failed to update Leistung');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating Leistung:', error);
    throw error;
  }
};

export const deleteLeistung = async (id) => {
  try {
    const response = await fetch(`${API_URL}/leistung/deleteLeistung/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Failed to delete Leistung');
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting Leistung:', error);
    throw error;
  }
};
