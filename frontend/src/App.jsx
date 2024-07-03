// src/App.js

// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from "./components/ProtectedRoute";
import Login from './components/Login';
import Home from './components/DashboardComponents/Home';
import CreateAngebot from './components/CreateAngebot';
import CreateRechnung from './components/CreateRechnung';
import EditDocument from './components/EditDocument';
import StaticDocument from './components/StaticDocumentComponents/StaticDocument';
import Project from './components/Project';
import CreateLeistung from './components/LeistungenComponents/CreateLeistung';
import CreateKunde from './components/KundenComponents/CreateKunde';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute component={Home} />} />
          <Route path="/CreateAngebot" element={<ProtectedRoute component={CreateAngebot} />} />
          <Route path="/CreateRechnung" element={<ProtectedRoute component={CreateRechnung} />} />
          <Route path="/CreateKunde" element={<ProtectedRoute component={CreateKunde} />} />
          <Route path="/CreateLeistung" element={<ProtectedRoute component={CreateLeistung} />} />


          <Route path="/editDocument/:id" element={<ProtectedRoute component={EditDocument} />} />
          <Route path="/staticDocument" element={<ProtectedRoute component={StaticDocument} />} />
          <Route path="/project/:projectId" element={<ProtectedRoute component={Project} />} />

          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
