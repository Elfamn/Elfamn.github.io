import { useState, useEffect, useRef } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

const mockDestinations = [
    {
        id: '1',
        name: 'Київ',
        country: 'Україна',
        countryImage: './images/ukraine.jpg',
        description: 'Столиця України, місто з тисячолітньою історією. Київ вражає поєднанням сучасності та давніх пам\'яток.',
        image: './images/kyiv.jpg',
        rating: 5,
        price: 'від 750 грн',
        tags: ['визначні місця', 'розваги'],
        popularity: 90
    },
    {
        id: '2',
        name: 'Одеса',
        country: 'Україна',
        countryImage: './images/ukraine.jpg',
        description: 'Одеса - це перлина Чорного моря, відома своїми пляжами, морським портом та унікальною архітектурою.',
        image: './images/odessa.jpg',
        rating: 5,
        price: 'від 600 грн',
        tags: ['пляжі', 'розваги'],
        popularity: 85
    },
    {
        id: '3',
        name: 'Карпати',
        country: 'Україна',
        countryImage: './images/ukraine.jpg',
        description: 'Карпати - це мальовничі гори, що пропонують туристам чудові краєвиди, свіже повітря та різноманітні активності.',
        image: './images/karpaty.jpg',
        rating: 4,
        price: 'від 700 грн',
        tags: ['визначні місця', 'розваги'],
        popularity: 80
    },
    {
        id: '4',
        name: 'Харків',
        country: 'Україна',
        countryImage: './images/ukraine.jpg',
        description: 'Харків - друге за величиною місто України, яке славиться своїми парками, музеями та освітніми закладами.',
        image: './images/kharkiv.jpg',
        rating: 3,
        price: 'від 800 грн',
        tags: ['визначні місця'],
        popularity: 70
    },
    {
        id: '5',
        name: 'Львів',
        country: 'Україна',
        countryImage: './images/ukraine.jpg',
        description: 'Львів - культурна столиця України, відома своєю старовинною архітектурою, ароматною кавою та середньовічними вуличками.',
        image: './images/lviv.jpg',
        rating: 5,
        price: 'від 1150 грн',
        tags: ['визначні місця', 'розваги'],
        popularity: 88
    },
    {
        id: '6',
        name: 'Івано-Франківськ',
        country: 'Україна',
        countryImage: './images/ukraine.jpg',
        description: 'Затишне місто біля Карпат, відоме своєю атмосферою, історичними будівлями та європейським стилем життя.',
        image: './images/ivano-frankivsk.jpg',
        rating: 3,
        price: 'від 1000 грн',
        tags: ['визначні місця'],
        popularity: 65
    },
    {
        id: '7',
        name: 'Чернігів',
        country: 'Україна',
        countryImage: './images/ukraine.jpg',
        description: 'Одне з найдавніших міст України, відоме своїми стародавніми храмами, мальовничими краєвидами та унікальною історією.',
        image: './images/chernihiv.jpg',
        rating: 4,
        price: 'від 950 грн',
        tags: ['визначні місця'],
        popularity: 75
    },
    {
        id: '8',
        name: 'Ужгород',
        country: 'Україна',
        countryImage: './images/ukraine.jpg',
        description: 'Найменший обласний центр України, що зачаровує своєю європейською атмосферою, старовинним замком і найдовшою липовою алеєю в Європі.',
        image: './images/uzhhorod.jpg',
        rating: 3,
        price: 'від 1050 грн',
        tags: ['розваги'],
        popularity: 60
    },
    {
        id: '9',
        name: 'Лондон',
        country: 'Англія',
        countryImage: './images/england.jpg',
        description: 'Столиця Англії, відома своїми історичними пам\'ятками, музеями та культурними подіями.',
        image: './images/london.jpg',
        rating: 5,
        price: 'від 1500 грн',
        tags: ['визначні місця', 'розваги'],
        popularity: 95
    },
    {
        id: '10',
        name: 'Манчестер',
        country: 'Англія',
        countryImage: './images/england.jpg',
        description: 'Відомий своїми футбольними клубами, музичною сценою та індустріальною спадщиною.',
        image: './images/manchester.jpg',
        rating: 4,
        price: 'від 1200 грн',
        tags: ['розваги', 'визначні місця'],
        popularity: 85
    },
    {
        id: '11',
        name: 'Ліверпуль',
        country: 'Англія',
        countryImage: './images/england.jpg',
        description: 'Місто, відоме своїм музичним спадком, зокрема гуртом The Beatles, та морською історією.',
        image: './images/liverpool.jpg',
        rating: 4,
        price: 'від 1100 грн',
        tags: ['визначні місця', 'розваги'],
        popularity: 80
    },
    {
        id: '12',
        name: 'Оксфорд',
        country: 'Англія',
        countryImage: './images/england.jpg',
        description: 'Відомий своїм університетом, одним з найстаріших у світі, та архітектурними пам\'ятками.',
        image: './images/oxford.jpg',
        rating: 5,
        price: 'від 1300 грн',
        tags: ['визначні місця', 'розваги'],
        popularity: 87
    },
    {
        id: '13',
        name: 'Париж',
        country: 'Франція',
        countryImage: './images/france.jpg',
        description: 'Столиця Франції, відома своєю Ейфелевою вежею, музеєм Лувр та багатою культурною спадщиною.',
        image: './images/paris.jpg',
        rating: 5,
        price: 'від 2000 грн',
        tags: ['визначні місця', 'розваги'],
        popularity: 92
    },
    {
        id: '14',
        name: 'Ніцца',
        country: 'Франція',
        countryImage: './images/france.jpg',
        description: 'Відоме своїм Середземноморським узбережжям, курортами та мальовничими пляжами.',
        image: './images/nice.jpg',
        rating: 5,
        price: 'від 1800 грн',
        tags: ['пляжі', 'розваги'],
        popularity: 88
    },
    {
        id: '15',
        name: 'Ліон',
        country: 'Франція',
        countryImage: './images/france.jpg',
        description: 'Місто відоме своєю гастрономічною культурою та історичною архітектурою.',
        image: './images/lyon.jpg',
        rating: 4,
        price: 'від 1500 грн',
        tags: ['пляжі', 'визначні місця', 'розваги'],
        popularity: 85
    },
    {
        id: '16',
        name: 'Марсель',
        country: 'Франція',
        countryImage: './images/france.jpg',
        description: 'Портове місто на півдні Франції, відоме своїм багатим культурним спадком та морськими пейзажами.',
        image: './images/marseille.jpg',
        rating: 4,
        price: 'від 1600 грн',
        tags: ['пляжі', 'визначні місця'],
        popularity: 83
    },
    {
        id: '17',
        name: 'Дубай',
        country: 'ОАЕ',
        countryImage: './images/uae.jpg',
        description: 'Відомий хмарочосом Бурдж Халіфа, розкішними торговими центрами та пляжами.',
        image: './images/dubai.jpg',
        rating: 5,
        price: 'від 2500 грн',
        tags: ['пляжі', 'визначні місця', 'розваги'],
        popularity: 98
    },
    {
        id: '18',
        name: 'Абу-Дабі',
        country: 'ОАЕ',
        countryImage: './images/uae.jpg',
        description: 'Столиця ОАЕ, відома своїми культурними об\'єктами та футуристичними хмарочосами.',
        image: './images/abu-dhabi.jpg',
        rating: 5,
        price: 'від 2400 грн',
        tags: ['визначні місця', 'розваги'],
        popularity: 96
    },
    {
        id: '19',
        name: 'Шарджа',
        country: 'ОАЕ',
        countryImage: './images/uae.jpg',
        description: 'Місто, відоме своїми музеями, культурною спадщиною та традиційними ринками.',
        image: './images/sharjah.jpg',
        rating: 4,
        price: 'від 2000 грн',
        tags: ['визначні місця', 'розваги'],
        popularity: 85
    },
    {
        id: '20',
        name: 'Фуджейра',
        country: 'ОАЕ',
        countryImage: './images/uae.jpg',
        description: 'Емірат на узбережжі Індійського океану, відомий своїми пляжами та горами Хаджар.',
        image: './images/fujairah.jpg',
        rating: 4,
        price: 'від 2200 грн',
        tags: ['пляжі', 'визначні місця'],
        popularity: 81
    },
    {
        id: '21',
        name: 'Рим',
        country: 'Італія',
        countryImage: './images/italy.jpg',
        description: 'Столиця Італії, відома своїми історичними пам\'ятками, такими як Колізей та Ватикан.',
        image: './images/rome.jpg',
        rating: 5,
        price: 'від 2000 грн',
        tags: ['розваги', 'визначні місця'],
        popularity: 95
    },
    {
        id: '22',
        name: 'Венеція',
        country: 'Італія',
        countryImage: './images/italy.jpg',
        description: 'Місто на воді, відоме своїми каналами, гондолами та архітектурою.',
        image: './images/venice.jpg',
        rating: 5,
        price: 'від 1800 грн',
        tags: ['розваги', 'визначні місця'],
        popularity: 91
    },
    {
        id: '23',
        name: 'Флоренція',
        country: 'Італія',
        countryImage: './images/italy.jpg',
        description: 'Відоме своїм мистецтвом, архітектурою та культурною спадщиною.',
        image: './images/florence.jpg',
        rating: 4,
        price: 'від 1700 грн',
        tags: ['розваги', 'визначні місця'],
        popularity: 87
    },
    {
        id: '24',
        name: 'Мілан',
        country: 'Італія',
        countryImage: './images/italy.jpg',
        description: 'Місто моди та дизайну, відоме своїми магазинами, музеями та архітектурою.',
        image: './images/milan.jpg',
        rating: 4,
        price: 'від 2200 грн',
        tags: ['визначні місця'],
        popularity: 89
    }
];

export const useDestinations = () => {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;

        const fetchDestinations = async () => {
            try {
                setLoading(true);
                const destinationsRef = collection(db, 'destinations');
                const querySnapshot = await getDocs(destinationsRef);

                if (!isMounted.current) return;

                const destinationsData = [];
                const uniqueDestinations = new Set();

                querySnapshot.forEach((doc) => {
                    const countryData = doc.data();

                    if (countryData.places && Array.isArray(countryData.places)) {
                        countryData.places.forEach(place => {
                            const uniqueIdentifier = `${countryData.name}-${place.name}`;

                            if (!uniqueDestinations.has(uniqueIdentifier)) {
                                uniqueDestinations.add(uniqueIdentifier);

                                destinationsData.push({
                                    id: `${doc.id}-${place.name.replace(/\s+/g, '-')}`,
                                    name: place.name,
                                    country: countryData.name,
                                    countryImage: countryData.image,
                                    description: place.description,
                                    image: place.image,
                                    rating: place.rating && typeof place.rating === 'string'
                                        ? parseInt(place.rating.match(/\d+/)?.[0] || "5")
                                        : (typeof place.rating === 'number' ? place.rating : 5),
                                    price: place.price,
                                    tags: place.tags || ["визначні місця"],
                                    popularity: Math.floor(Math.random() * 30) + 70
                                });
                            }
                        });
                    } else if (countryData.name) {
                        if (!uniqueDestinations.has(countryData.name)) {
                            uniqueDestinations.add(countryData.name);
                            destinationsData.push({
                                id: doc.id,
                                ...countryData
                            });
                        }
                    }
                });

                if (!isMounted.current) return;

                console.log(`Processed ${destinationsData.length} destinations from ${uniqueDestinations.size} unique locations`);

                if (destinationsData.length > 0) {
                    setDestinations(destinationsData);
                } else {
                    console.log('No destinations found in Firebase, using mock data');
                    setDestinations(mockDestinations);
                }
                setError(null);
            } catch (error) {
                console.error('Помилка при отриманні популярних напрямків:', error);
                if (isMounted.current) {
                    console.log('Error fetching destinations, using mock data as fallback');
                    setDestinations(mockDestinations);
                    setError(error.message);
                }
            } finally {
                if (isMounted.current) {
                    setLoading(false);
                }
            }
        };

        fetchDestinations();

        return () => {
            isMounted.current = false;
        };
    }, []);

    return { destinations, loading, error };
};

export default useDestinations;