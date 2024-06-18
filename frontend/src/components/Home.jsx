// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();

  const handleCreateAngebot = () => {
    navigate('/CreateAngebot');  
  };

  const handleCreateRechnung = () => {
    navigate('/CreateRechnung');  
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
