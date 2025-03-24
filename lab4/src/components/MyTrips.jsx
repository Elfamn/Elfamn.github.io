import React from 'react';
import { useTripManager } from '../utils/useTripManager';
import { useAuth } from '../utils/AuthContext';
import { Link } from 'react-router-dom';

const MyTrips = () => {
  const { trips, loading } = useTripManager();
  const { isAuthenticated } = useAuth();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="container">
        <div className="auth-required">
          <h2>Вхід в систему</h2>
          <p>Для доступу до цієї сторінки необхідно увійти в систему.</p>
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-primary">Увійти</Link>
            <Link to="/register" className="btn btn-secondary">Зареєструватися</Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container">
        <div className="loading">Завантаження...</div>
      </div>
    );
  }
  
  return (
    <section id="my-trips" className="section">
      <div className="container">
        <h2>Мої подорожі</h2>
        <div className="trips-list">
          {trips.length > 0 ? (
            trips.map((trip) => {
              const statusClass = trip.type === 'План' ? 'plan-status' : 'visited-status';

              return (
                <div key={trip.id} className={`trip-card ${statusClass}`} data-id={trip.id}>
                  <img
                    src={trip.image}
                    alt={trip.place}
                  />
                  <div className="trip-info">
                    <div className="trip-header">
                      <h3>{trip.place}</h3>
                      <span className="trip-status">{trip.type}</span>
                    </div>
                    <p className="trip-country">{trip.country}</p>
                    <p className="trip-date">
                      {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
                    </p>
                    <p className="trip-description">{trip.description || ''}</p>
                    {trip.budget && (
                      <div className="trip-budget">
                        <span>Бюджет: {trip.budget} грн</span>
                      </div>
                    )}
                    {trip.type === 'Відвідано' && trip.rating && (
                      <div className="trip-rating">
                        {[...Array(parseInt(trip.rating))].map((_, i) => (
                          <span key={i} className="star">⭐</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-state">
              <p>У вас ще немає запланованих подорожей.</p>
              <p>Перейдіть до розділу "Місця для відвідування", щоб додати нові подорожі до списку.</p>
              <Link to="/countries" className="btn btn-primary">Розпочати планування</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyTrips;