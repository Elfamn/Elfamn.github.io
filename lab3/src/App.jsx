import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Countries from './components/Countries';
import Budget from './components/Budget';
import MyTrips from './components/MyTrips';
import TripModal from './components/TripModal';
import './styles.css';

function App() {
  const [modalState, setModalState] = useState({
    isOpen: false,
    place: '',
    country: '',
    onSave: null
  });

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

  return (
    <Router basename="/lab3">
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/countries" element={<Countries openGlobalModal={openGlobalModal} />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/mytrips" element={<MyTrips />} />
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
    </Router>
  );
}

export default App;