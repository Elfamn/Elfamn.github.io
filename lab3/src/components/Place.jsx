import React, { useState, useRef } from 'react';
import { useTripManager } from '../utils/useTripManager';
import { getCityInfo } from '../utils/getCityInfo';

const Place = ({ place, countryName, openGlobalModal }) => {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showDescription, setShowDescription] = useState(false);
    const [cityDetails, setCityDetails] = useState(null);
    const { saveTrip } = useTripManager();

    const handleAddToTrip = (e) => {
        e.preventDefault();

        const handleSaveTrip = (tripData) => {

            const updatedTripData = {
                ...tripData,
                image: place.image
            };

            saveTrip(updatedTripData);
            setShowSuccessMessage(true);

            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        };

        openGlobalModal(place.name, countryName, handleSaveTrip);
    };

    const handleShowDescription = (e) => {
        e.preventDefault();

        if (showDescription) {
            setShowDescription(false);
        } else {
            const cityInfo = getCityInfo(place.name);
            setCityDetails(cityInfo);
            setShowDescription(true);
        }
    };

    return (
        <div className="trip-card">
            <img
                src={place.image}
                onError={(e) => {
                    console.log('Image not found, using fallback');
                    e.target.src = 'images/travel-background.jpg';
                }}
                alt={place.name}
            />
            <div className="trip-info">
                <div className="trip-header">
                    <h3>{place.name}</h3>
                    <span className="trip-rating">{place.rating}</span>
                </div>
                <p className="trip-country">{countryName}</p>
                <p className="trip-price">{place.price}</p>
                <p className="trip-description">{place.description}</p>

                <div className="trip-actions">
                    <button className="add-trip-btn" onClick={handleAddToTrip}>
                        Додати до подорожей
                    </button>
                    <button className="detail-description-btn" onClick={handleShowDescription}>
                        {showDescription ? 'Сховати деталі' : 'Детальний опис'}
                    </button>
                </div>

                {showSuccessMessage && (
                    <div className="success-message">
                        Додано до ваших подорожей!
                    </div>
                )}

                {showDescription && cityDetails && cityDetails.sections && cityDetails.sections.length > 0 && (
                    <div className="detailed-info-container">
                        {cityDetails.sections.map((section, index) => (
                            <div key={index} className="detail-section">
                                <h4>{section.title}</h4>
                                <p>{section.content}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Place;