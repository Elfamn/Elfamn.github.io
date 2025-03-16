import React from 'react';
import { useTripManager } from '../utils/useTripManager';

const MyTrips = () => {
  const { trips, getImageFileName } = useTripManager();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getFullYear()}`;
  };

  return (
    <section id="my-trips" className="section">
      <div className="container">
        <h2>Мої подорожі</h2>
        <div className="trips-list">
          {trips.length > 0 ? (
            trips.map((trip) => {
              const statusClass = trip.type === 'План' ? 'plan-status' : 'visited-status';
              const imageFileName = getImageFileName(trip.place);

              return (
                <div key={trip.id} className={`trip-card ${statusClass}`} data-id={trip.id}>
                  <img
                    src={`images/${imageFileName}.jpg`}
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyTrips;