// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleCreateAngebot = () => {
    navigate('/createAngebot');  // Use navigate for redirection
  };

  const handleCreateRechnung = () => {
    navigate('/create-rechnung');  // Use navigate for redirection
  };

  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <button onClick={handleCreateAngebot}>Create Angebot</button>
      <button onClick={handleCreateRechnung}>Create Rechnung</button>
    </div>
  );
}

export default Home;
