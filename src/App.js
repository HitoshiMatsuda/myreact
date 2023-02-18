import React from 'react';
import './App.css';
import './service/firebase';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { AuthProvider } from './providers/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Dashboard />
    </AuthProvider>
  );
}

export default App;
