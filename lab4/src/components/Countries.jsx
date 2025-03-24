import React, { useState, useEffect, useCallback } from 'react';
import Place from './Place';
import { useDestinations } from '../utils/useDestinations';

const Countries = ({ openGlobalModal }) => {
    const [activeFilter, setActiveFilter] = useState('all');
    const { destinations, loading, error } = useDestinations();
    const [countriesData, setCountriesData] = useState([]);
    const [isProcessing, setIsProcessing] = useState(false);

    const processDestinations = useCallback((destinationsData) => {
        if (!destinationsData || destinationsData.length === 0) return [];
        
        const groupedByCountry = destinationsData.reduce((acc, destination) => {
            const country = destination.country;
            if (!country) {
                console.warn('Destination missing country:', destination);
                return acc;
            }

            if (!acc[country]) {
                acc[country] = {
                    id: country.toLowerCase().replace(/\s+/g, '-'),
                    name: country,
                    image: destination.countryImage || `./images/${country.toLowerCase().replace(/\s+/g, '-')}.jpg`,
                    places: []
                };
            }

            if (destination.name) {
                const existingPlaceIndex = acc[country].places.findIndex(
                    place => place.name === destination.name
                );
                
                if (existingPlaceIndex === -1) {
                    acc[country].places.push({
                        name: destination.name,
                        image: destination.image && destination.image.trim() !== '' 
                            ? destination.image 
                            : `images/${destination.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
                        description: destination.description || `Опис для ${destination.name}`,
                        price: destination.price || "від 750 грн",
                        rating: typeof destination.rating === 'number' 
                            ? "⭐".repeat(Math.round(destination.rating || 5))
                            : destination.rating || "⭐⭐⭐⭐⭐",
                        tags: destination.tags || ["визначні місця"]
                    });
                }
            }

            return acc;
        }, {});

        return Object.values(groupedByCountry);
    }, []);

    useEffect(() => {
        let isMounted = true;
        
        if (destinations && destinations.length > 0 && !isProcessing) {
            setIsProcessing(true);
            
            try {
                console.log('Починаємо обробку даних напрямків...', destinations.length, 'destinations');
                const processedData = processDestinations(destinations);
                
                if (isMounted) {
                    console.log('Оброблені дані країн:', processedData);
                    const totalPlaces = processedData.reduce((total, country) => 
                        total + country.places.length, 0);
                    console.log(`Total places processed: ${totalPlaces}`);
                    
                    setCountriesData(processedData);
                    setIsProcessing(false);
                }
            } catch (e) {
                console.error('Помилка під час обробки даних:', e);
                if (isMounted) {
                    setIsProcessing(false);
                }
            }
        }
        
        return () => {
            isMounted = false;
        };
    }, [destinations, isProcessing, processDestinations]);

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    const getFilteredPlaces = useCallback((places) => {
        if (activeFilter === 'all') {
            return places;
        }
        return places.filter(place => 
            place.tags && Array.isArray(place.tags) && place.tags.includes(activeFilter)
        );
    }, [activeFilter]);

    if (loading) {
        return (
            <div className="container">
                <div className="loading">Завантаження...</div>
            </div>
        );
    }

    if (error) {
        console.error('Error loading destinations:', error);
        return (
            <div className="container">
                <div className="error">Помилка завантаження даних: {error}</div>
            </div>
        );
    }

    if (!countriesData || countriesData.length === 0) {
        return (
            <div className="container">
                <div className="no-data">Немає доступних напрямків для відображення або йде обробка даних...</div>
            </div>
        );
    }

    return (
        <section id="countries" className="section">
            <div className="container">
                <h2>Місця для відвідування</h2>

                <div className="filter-buttons">
                    <button
                        className={activeFilter === 'all' ? 'active' : ''}
                        onClick={() => handleFilterChange('all')}
                    >
                        Усі
                    </button>
                    <button
                        className={activeFilter === 'пляжі' ? 'active' : ''}
                        onClick={() => handleFilterChange('пляжі')}
                    >
                        Пляжі
                    </button>
                    <button
                        className={activeFilter === 'визначні місця' ? 'active' : ''}
                        onClick={() => handleFilterChange('визначні місця')}
                    >
                        Визначні місця
                    </button>
                    <button
                        className={activeFilter === 'розваги' ? 'active' : ''}
                        onClick={() => handleFilterChange('розваги')}
                    >
                        Розваги
                    </button>
                </div>

                <div className="countries-list">
                    {countriesData.map(country => {
                        const filteredPlaces = getFilteredPlaces(country.places);

                        if (filteredPlaces.length === 0) {
                            return null;
                        }

                        return (
                            <div className="country-item" id={country.id} key={country.id}>
                                <a href={`#${country.id}`} className="country-link">
                                    <img 
                                        src={country.image} 
                                        alt={country.name}
                                        onError={(e) => {
                                            console.log(`Помилка завантаження зображення країни ${country.name}`);
                                            e.target.src = './images/travel-background.jpg';
                                        }}
                                    />
                                    <div className="country-details">
                                        <h3>{country.name}</h3>
                                    </div>
                                </a>
                                <a href="#" className="close-target" aria-label="Згорнути"></a>
                                <div className="cities-container">
                                    {filteredPlaces.map((place, index) => (
                                        <Place
                                            key={`${country.id}-${place.name.toLowerCase().replace(/\s+/g, '-')}-${index}`}
                                            place={place}
                                            countryName={country.name}
                                            openGlobalModal={openGlobalModal}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Countries;