import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Countries from './components/Countries';
import Budget from './components/Budget';
import MyTrips from './components/MyTrips';
import TripModal from './components/TripModal';
import Login from './components/Login';
import Register from './components/Register';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider, useAuth } from './utils/AuthContext';
import './styles.css';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

function AppContent() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    place: '',
    country: '',
    onSave: null
  });

  const [dataLoaded, setDataLoaded] = useState(false);
  const [dataError, setDataError] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setDataLoaded(true);
      } catch (error) {
        console.error('Error initializing data:', error);
        setDataError(error.message);
        setDataLoaded(true);
      }
    };

    initializeData();
  }, []);

  const openGlobalModal = (place, country, onSave) => {
    setModalState({
      isOpen: true,
      place,
      country,
      onSave
    });
  };

  const closeGlobalModal = () => {
    setModalState(prev => ({
      ...prev,
      isOpen: false
    }));
  };

  if (!dataLoaded) {
    return (
      <div className="app-container">
        <Header />
        <main className="main-content">
          <div className="loading">Завантаження даних...</div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        {dataError && (
          <div className="error-notification">
            Виникла помилка з базою даних. Використовуємо резервні дані.
          </div>
        )}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/countries" element={
            <ErrorBoundary>
              <Countries openGlobalModal={openGlobalModal} />
            </ErrorBoundary>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/budget" element={
            <ProtectedRoute>
              <Budget />
            </ProtectedRoute>
          } />
          <Route path="/mytrips" element={
            <ProtectedRoute>
              <MyTrips />
            </ProtectedRoute>
          } />
        </Routes>
      </main>

      <TripModal
        isOpen={modalState.isOpen}
        onClose={closeGlobalModal}
        place={modalState.place}
        country={modalState.country}
        onSave={(tripData) => {
          if (modalState.onSave) {
            modalState.onSave(tripData);
          }
          closeGlobalModal();
        }}
      />

      <Footer />
    </div>
  );

}

function App() {
  return (
    <Router basename="/lab4">
      <AuthProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;