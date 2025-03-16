import { useState, useEffect } from 'react';

export const useTripManager = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const savedTrips = JSON.parse(localStorage.getItem('myTrips')) || [];
        setTrips(savedTrips);
    }, []);

    const saveTrip = (tripData) => {
        const newTrip = {
            ...tripData,
            id: Date.now(),
            image: tripData.image || `images/${getImageFileName(tripData.place)}.jpg`
        };

        const updatedTrips = [...trips, newTrip];
        setTrips(updatedTrips);
        localStorage.setItem('myTrips', JSON.stringify(updatedTrips));

        return newTrip;
    };

    const getImageFileName = (placeName) => {
        if (!placeName) return 'travel-background';

        const placeToImage = {
            'дубай': 'dubai',
            'київ': 'kyiv',
            'мілан': 'milan',
            'париж': 'paris',
            'рим': 'rome',
            'абу-дабі': 'abu-dhabi',
            'львів': 'lviv',
            'флоренція': 'florence',
            'фурджейра': 'fujairah',
            'івано-франківськ': 'ivano-frankivsk',
            'лондон': 'london',
            'карпати': 'karpaty',
            'марсель': 'marseille',
            'ліон': 'lyon',
            'манчестер': 'manchester',
            'ніцца': 'nice',
            'одеса': 'odessa',
            'ужгород': 'uzhgorod',
            'харків': 'kharkiv',
            'чернігів': 'chernihiv',
            'шарджа': 'sharjah',
            'ліверпуль': 'liverpool',
            'венеція': 'venice',
            'оксфорд': 'oxford',
        };

        const lowercaseName = placeName.toLowerCase();

        return placeToImage[lowercaseName] || lowercaseName;
    };

    return {
        trips,
        saveTrip,
        getImageFileName
    };
};

export default useTripManager;