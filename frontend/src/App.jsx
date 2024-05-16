// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './components/Login';
import Home from './components/Home';
import CreateAngebot from './components/CreateAngebot';


import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
      <Router>
        {/* <AuthProvider> */}
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
            <Home />
          } />
          <Route path="/CreateAngebot" element={
            <CreateAngebot></CreateAngebot>
          } />
        </Routes>
        {/* </AuthProvider> */}
      </Router>
  );
}

export default App;

