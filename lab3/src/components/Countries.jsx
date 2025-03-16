import React, { useState } from 'react';
import Place from './Place';

const Countries = ({ openGlobalModal }) => {
    const [activeFilter, setActiveFilter] = useState('all');

    const countriesData = [
        {
            id: "ukraine",
            name: "Україна",
            image: "./images/ukraine.jpg",
            places: [
                {
                    name: "Київ",
                    image: "images/kyiv.jpg",
                    description: "Столиця України, місто з тисячолітньою історією. Київ вражає поєднанням сучасності та давніх пам'яток.",
                    price: "від 750 грн",
                    rating: "⭐⭐⭐⭐⭐",
                    tags: ["визначні місця", "розваги"]
                },
                {
                    name: "Одеса",
                    image: "images/odessa.jpg",
                    description: "Одеса - це перлина Чорного моря, відома своїми пляжами, морським портом та унікальною архітектурою.",
                    price: "від 600 грн",
                    rating: "⭐⭐⭐⭐⭐",
                    tags: ["пляжі", "розваги"]
                },
                {
                    name: "Карпати",
                    image: "images/karpaty.jpg",
                    description: "Карпати - це мальовничі гори, що пропонують туристам чудові краєвиди, свіже повітря та різноманітні активності.",
                    price: "від 700 грн",
                    rating: "⭐⭐⭐⭐☆",
                    tags: ["визначні місця", "розваги"]
                },
                {
                    name: "Харків",
                    image: "images/kharkiv.jpg",
                    description: "Харків - друге за величиною місто України, яке славиться своїми парками, музеями та освітніми закладами.",
                    price: "від 800 грн",
                    rating: "⭐⭐⭐☆☆",
                    tags: ["визначні місця"]
                },
                {
                    name: "Львів",
                    image: "images/lviv.jpg",
                    description: "Львів - культурна столиця України, відома своєю старовинною архітектурою, ароматною кавою та середньовічними вуличками.",
                    price: "від 1150 грн",
                    rating: "⭐⭐⭐⭐⭐",
                    tags: ["визначні місця", "розваги"]
                },
                {
                    name: "Івано-Франківськ",
                    image: "images/ivano-frankivsk.jpg",
                    description: "Затишне місто біля Карпат, відоме своєю атмосферою, історичними будівлями та європейським стилем життя.",
                    price: "від 1000 грн",
                    rating: "⭐⭐⭐☆☆",
                    tags: ["визначні місця"]
                },
                {
                    name: "Чернігів",
                    image: "images/chernihiv.jpg",
                    description: "Одне з найдавніших міст України, відоме своїми стародавніми храмами, мальовничими краєвидами та унікальною історією.",
                    price: "від 950 грн",
                    rating: "⭐⭐⭐⭐☆",
                    tags: ["визначні місця"]
                },
                {
                    name: "Ужгород",
                    image: "images/uzhhorod.jpg",
                    description: "Найменший обласний центр України, що зачаровує своєю європейською атмосферою, старовинним замком і найдовшою липовою алеєю в Європі.",
                    price: "від 1050 грн",
                    rating: "⭐⭐⭐☆☆",
                    tags: ["розваги"]
                }
            ]
        },
        {
            id: "england",
            name: "Англія",
            image: "images/england.jpg",
            places: [
                {
                    name: "Лондон",
                    image: "images/london.jpg",
                    description: "Столиця Англії, відома своїми історичними пам'ятками, музеями та культурними подіями.",
                    price: "від 1500 грн",
                    rating: "⭐⭐⭐⭐⭐",
                    tags: ["визначні місця", "розваги"]
                },
                {
                    name: "Манчестер",
                    image: "images/manchester.jpg",
                    description: "Відомий своїми футбольними клубами, музичною сценою та індустріальною спадщиною.",
                    price: "від 1200 грн",
                    rating: "⭐⭐⭐⭐☆",
                    tags: ["розваги", "визначні місця"]
                },
                {
                    name: "Ліверпуль",
                    image: "images/liverpool.jpg",
                    description: "Місто, відоме своїм музичним спадком, зокрема гуртом The Beatles, та морською історією.",
                    price: "від 1100 грн",
                    rating: "⭐⭐⭐⭐☆",
                    tags: ["визначні місця", "розваги"]
                },
                {
                    name: "Оксфорд",
                    image: "images/oxford.jpg",
                    description: "Відомий своїм університетом, одним з найстаріших у світі, та архітектурними пам'ятками.",
                    price: "від 1300 грн",
                    rating: "⭐⭐⭐⭐⭐",
                    tags: ["визначні місця", "розваги"]
                }
            ]
        },
        {
            id: "france",
            name: "Франція",
            image: "images/france.jpg",
            places: [
                {
                    name: "Париж",
                    image: "images/paris.jpg",
                    description: "Столиця Франції, відома своєю Ейфелевою вежею, музеєм Лувр та багатою культурною спадщиною.",
                    price: "від 2000 грн",
                    rating: "⭐⭐⭐⭐⭐",
                    tags: ["визначні місця", "розваги"]
                },
                {
                    name: "Ніцца",
                    image: "images/nice.jpg",
                    description: "Відоме своїм Середземноморським узбережжям, курортами та мальовничими пляжами.",
                    price: "від 1800 грн",
                    rating: "⭐⭐⭐⭐⭐",
                    tags: ["пляжі", "розваги"]
                },
                {
                    name: "Ліон",
                    image: "images/lyon.jpg",
                    description: "Місто відоме своєю гастрономічною культурою та історичною архітектурою.",
                    price: "від 1500 грн",
                    rating: "⭐⭐⭐⭐☆",
                    tags: ["пляжі", "визначні місця", "розваги"]
                },
                {
                    name: "Марсель",
                    image: "images/marseille.jpg",
                    description: "Портове місто на півдні Франції, відоме своїм багатим культурним спадком та морськими пейзажами.",
                    price: "від 1600 грн",
                    rating: "⭐⭐⭐⭐☆",
                    tags: ["пляжі", "визначні місця"]
                }
            ]
        },
        {
            id: "uae",
            name: "ОАЕ",
            image: "images/uae.jpg",
            places: [
                {
                    name: "Дубай",
                    image: "images/dubai.jpg",
                    description: "Відомий хмарочосом Бурдж Халіфа, розкішними торговими центрами та пляжами.",
                    price: "від 3000 грн",
                    rating: "⭐⭐⭐⭐⭐",
                    tags: ["пляжі", "розваги"]
                },
                {
                    name: "Абу-Дабі",
                    image: "images/abu-dhabi.jpg",
                    description: "Столиця ОАЕ, відома розкішними готелями, Великим мечетом шейха Заїда та культурними пам'ятками.",
                    price: "від 2800 грн",
                    rating: "⭐⭐⭐⭐⭐",
                    tags: ["пляжі", "визначні місця", "розваги"]
                },
                {
                    name: "Шарджа",
                    image: "images/sharjah.jpg",
                    description: "Відоме своєю культурною спадщиною, музеями та традиційними ринками (соуками).",
                    price: "від 2500 грн",
                    rating: "⭐⭐⭐⭐☆",
                    tags: ["визначні місця", "розваги"]
                },
                {
                    name: "Фуджейра",
                    image: "images/fujairah.jpg",
                    description: "Емірат на узбережжі Індійського океану, відомий своїми пляжами та горами Хаджар.",
                    price: "від 2200 грн",
                    rating: "⭐⭐⭐⭐☆",
                    tags: ["пляжі", "визначні місця"]
                }
            ]
        },
        {
            id: "italy",
            name: "Італія",
            image: "images/italy.jpg",
            places: [
                {
                    name: "Рим",
                    image: "images/rome.jpg",
                    description: "Столиця Італії, відома своїми історичними пам'ятками, такими як Колізей та Ватикан.",
                    price: "від 2000 грн",
                    rating: "⭐⭐⭐⭐⭐",
                    tags: ["визначні місця", "розваги"]
                },
                {
                    name: "Венеція",
                    image: "images/venice.jpg",
                    description: "Місто на воді, відоме своїми каналами, гондолами та архітектурою.",
                    price: "від 1800 грн",
                    rating: "⭐⭐⭐⭐⭐",
                    tags: ["визначні місця", "розваги"]
                },
                {
                    name: "Флоренція",
                    image: "images/florence.jpg",
                    description: "Відоме своїм мистецтвом, архітектурою та культурною спадщиною.",
                    price: "від 1700 грн",
                    rating: "⭐⭐⭐⭐☆",
                    tags: ["визначні місця", "розваги"]
                },
                {
                    name: "Мілан",
                    image: "images/milan.jpg",
                    description: "Місто моди та дизайну, відоме своїми магазинами, музеями та архітектурою.",
                    price: "від 1900 грн",
                    rating: "⭐⭐⭐⭐☆",
                    tags: ["розваги", "визначні місця"]
                }
            ]
        }
    ];

    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    const getFilteredPlaces = (places) => {
        if (activeFilter === 'all') {
            return places;
        }
        return places.filter(place => place.tags.includes(activeFilter));
    };

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
                                    <img src={country.image} alt={country.name} />
                                    <div className="country-details">
                                        <h3>{country.name}</h3>
                                    </div>
                                </a>
                                <a href="#" className="close-target" aria-label="Згорнути"></a>
                                <div className="cities-container">
                                    {filteredPlaces.map(place => (
                                        <Place
                                            key={place.name}
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
