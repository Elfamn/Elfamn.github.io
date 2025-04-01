import React, { useState, useEffect } from 'react';

const TripModal = ({ isOpen, onClose, place, country, onSave }) => {
    const [tripType, setTripType] = useState('plan');
    const [formData, setFormData] = useState({
        startDate: '',
        endDate: '',
        description: '',
        rating: ''
    });

    useEffect(() => {
        if (isOpen) {
            const today = new Date().toISOString().split('T')[0];
            setFormData({
                startDate: today,
                endDate: today,
                description: '',
                rating: ''
            });
            setTripType('plan');
        }
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClose = () => {
        setFormData({
            startDate: '',
            endDate: '',
            description: '',
            rating: ''
        });
        setTripType('plan');
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.startDate || !formData.endDate) {
            alert('Будь ласка, введіть дати подорожі.');
            return;
        }
        if (tripType === 'visited' && !formData.rating) {
            alert('Будь ласка, оцініть ваше відвідування.');
            return;
        }
        const tripData = {
            place,
            country,
            type: tripType === 'plan' ? 'План' : 'Відвідано',
            startDate: formData.startDate,
            endDate: formData.endDate,
            description: formData.description,
            ...(tripType === 'visited' && { rating: formData.rating })
        };

        onSave(tripData);
        handleClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal" style={{ display: 'flex' }}>
            <div className="modal-content">
                <span className="close-modal" onClick={handleClose}>&times;</span>

                <h2>Додати до моїх подорожей</h2>

                <div className="place-info">
                    <h3>{place}</h3>
                    <p>{country}</p>
                </div>

                <div className="trip-type-selection">
                    <h4>Виберіть тип:</h4>
                    <div className="trip-type-buttons">
                        <button
                            className={`trip-type-btn ${tripType === 'plan' ? 'active' : ''}`}
                            onClick={() => setTripType('plan')}
                        >
                            План
                        </button>
                        <button
                            className={`trip-type-btn ${tripType === 'visited' ? 'active' : ''}`}
                            onClick={() => setTripType('visited')}
                        >
                            Відвідано
                        </button>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {tripType === 'plan' ? (
                        <div className="trip-form active">
                            <div className="form-group">
                                <label htmlFor="startDate">Дата початку:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">Дата завершення:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Ваші очікування:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    placeholder="Розкажіть, що ви хочете відвідати, спробувати..."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="trip-form active">
                            <div className="form-group">
                                <label htmlFor="startDate">Дата відвідування:</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="endDate">Дата повернення:</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Ваші враження:</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    placeholder="Розкажіть про ваші враження від відвідування..."
                                    value={formData.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Ваша оцінка:</label>
                                <div className="star-rating">
                                    {[5, 4, 3, 2, 1].map(star => (
                                        <React.Fragment key={star}>
                                            <input
                                                type="radio"
                                                id={`star${star}`}
                                                name="rating"
                                                value={star}
                                                checked={formData.rating === String(star)}
                                                onChange={handleInputChange}
                                            />
                                            <label htmlFor={`star${star}`} title={`${star} зірок`}>★</label>
                                        </React.Fragment>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="modal-buttons">
                        <button type="submit" className="primary-btn">Зберегти</button>
                        <button type="button" className="secondary-btn" onClick={handleClose}>Скасувати</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TripModal;