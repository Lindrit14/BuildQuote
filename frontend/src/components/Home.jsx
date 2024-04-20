// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useHistory } from 'react-router-dom';

function Home() {
  const history = useHistory();

  const handleCreateAngebot = () => {
    history.push('/create-angebot');
  };

  const handleCreateRechnung = () => {
    history.push('/create-rechnung');
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
