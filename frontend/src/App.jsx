
import React, { useEffect, useState } from 'react';
import './App.css';
import UserForm from './components/UserForm';
import Login from "./components/Login"

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(response => response.json())
      .then(data => setData(data.message))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  return (
    
    <Login></Login>
  );
} 

export default App;
