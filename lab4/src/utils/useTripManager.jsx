import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';

export const useTripManager = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        const fetchTrips = async () => {
            if (!currentUser) {
                setTrips([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const tripsRef = collection(db, 'trips');
                const basicQuery = query(
                    tripsRef,
                    where('userId', '==', currentUser.uid)
                );
                
                const basicSnapshot = await getDocs(basicQuery);
                const tripsData = [];
                
                basicSnapshot.forEach((doc) => {
                    tripsData.push({ id: doc.id, ...doc.data() });
                });
                
                tripsData.sort((a, b) => {
                    if (a.createdAt && b.createdAt) {
                        if (a.createdAt instanceof Date && b.createdAt instanceof Date) {
                            return b.createdAt.getTime() - a.createdAt.getTime();
                        } else if (a.createdAt.seconds && b.createdAt.seconds) {
                            return b.createdAt.seconds - a.createdAt.seconds;
                        } else if (a.createdAt.toDate && b.createdAt.toDate) {
                            return b.createdAt.toDate() - a.createdAt.toDate();
                        }
                    }
                    return 0;
                });
                
                setTrips(tripsData);
            } catch (error) {
                console.error('Помилка при отриманні подорожей:', error);
                setTrips([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTrips();
    }, [currentUser]);

    const saveTrip = async (tripData) => {
        if (!currentUser) return null;

        const newTrip = {
            place: tripData.place || tripData.name,
            country: tripData.country,
            startDate: tripData.startDate || new Date().toISOString(),
            endDate: tripData.endDate || new Date().toISOString(),
            type: tripData.type || 'План',
            description: tripData.description || '',
            budget: tripData.budget || '',
            rating: tripData.rating || '',
            userId: currentUser.uid,
            createdAt: new Date(),
            image: tripData.image || `./images/${getImageFileName(tripData.place || tripData.name)}.jpg`
        };

        try {
            console.log('Збереження подорожі:', newTrip);
            const docRef = await addDoc(collection(db, 'trips'), newTrip);
            const savedTrip = { id: docRef.id, ...newTrip };
            setTrips(prevTrips => [savedTrip, ...prevTrips]);
            return savedTrip;
        } catch (error) {
            console.error('Помилка при збереженні подорожі:', error);
            console.error('Дані подорожі:', newTrip);
            return null;
        }
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
            'мадрид': 'madrid',
            'валенсія': 'valencia'
        };

        const lowercaseName = placeName.toLowerCase();
        return placeToImage[lowercaseName] || lowercaseName.replace(/\s+/g, '-');
    };

    return {
        trips,
        loading,
        saveTrip,
        getImageFileName
    };
};

export default useTripManager;