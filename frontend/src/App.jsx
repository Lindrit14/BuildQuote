// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './components/Login';
import Home from './components/Home';
import CreateAngebot from './components/CreateAngebot'; // Ensure these components are imported
import CreateRechnung from './components/CreateRechnung';
import EditDocument from './components/EditDocument';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes >
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute component={Home} />} />
          <Route path="/CreateAngebot" element={<ProtectedRoute component={CreateAngebot} />} />
          <Route path="/CreateRechnung" element={<ProtectedRoute component={CreateRechnung} />} />
          <Route path="/editDocument/:id" element={<ProtectedRoute component={EditDocument} />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
