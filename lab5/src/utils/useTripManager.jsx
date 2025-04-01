import { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from './AuthContext';

export const useTripManager = () => {
    const [trips, setTrips] = useState([]);
    const [sortedTrips, setSortedTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { currentUser } = useAuth();

    const API_BASE_URL = 'http://localhost:5001';

    const fetchSortedTrips = async (userId, tripData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/trips/sorted-by-duration?userId=${userId}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch sorted trips');
            }
            
            const sortedData = await response.json();
            setSortedTrips(sortedData);
        } catch (err) {
            console.error('Error fetching sorted trips:', err);
            setError(err.message);
            
            const clientSorted = [...(tripData || trips)].sort((a, b) => {
                const startDateA = new Date(a.startDate || 0);
                const endDateA = new Date(a.endDate || 0);
                const startDateB = new Date(b.startDate || 0);
                const endDateB = new Date(b.endDate || 0);
                
                const durationA = Math.ceil((endDateA.getTime() - startDateA.getTime()) / (1000 * 60 * 60 * 24));
                const durationB = Math.ceil((endDateB.getTime() - startDateB.getTime()) / (1000 * 60 * 60 * 24));
                
                return durationB - durationA;
            });
            setSortedTrips(clientSorted);
        }
    };

    useEffect(() => {
        const fetchTrips = async () => {
            if (!currentUser) {
                setTrips([]);
                setSortedTrips([]);
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
                
                try {
                    await fetchSortedTrips(currentUser.uid, tripsData);
                } catch (sortError) {
                    console.error('Error in sorting trips:', sortError);
                    const clientSorted = [...tripsData].sort((a, b) => {
                        const startDateA = new Date(a.startDate || 0);
                        const endDateA = new Date(a.endDate || 0);
                        const startDateB = new Date(b.startDate || 0);
                        const endDateB = new Date(b.endDate || 0);
                        
                        const durationA = Math.ceil((endDateA - startDateA) / (1000 * 60 * 60 * 24));
                        const durationB = Math.ceil((endDateB - startDateB) / (1000 * 60 * 60 * 24));
                        
                        return durationB - durationA;
                    });
                    setSortedTrips(clientSorted);
                }
            } catch (error) {
                console.error('Помилка при отриманні подорожей:', error);
                setTrips([]);
                setError(error.message);
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
            
            const updatedTrips = [savedTrip, ...trips];
            setTrips(updatedTrips);
            
            await fetchSortedTrips(currentUser.uid, updatedTrips);
            
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
        sortedTrips,
        loading,
        error,
        saveTrip,
        getImageFileName
    };
};

export default useTripManager;