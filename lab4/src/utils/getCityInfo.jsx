export const getCityInfo = (cityName) => {
    const cityData = {
        "Київ": {
            sections: [
                {
                    title: "Історія",
                    content: "Київ - одне з найстаріших міст Європи, засноване у 482 році. Протягом століть він був центром Київської Русі та має багату історичну спадщину."
                },
                {
                    title: "Пам'ятки",
                    content: "Києво-Печерська Лавра, Софійський собор, Андріївський узвіз, Хрещатик, Золоті ворота - лише деякі з багатьох визначних місць столиці."
                },
                {
                    title: "Інфраструктура",
                    content: "Київ має розвинену інфраструктуру з метро, автобусними маршрутами та сучасними торговими центрами."
                },
                {
                    title: "Ресторани",
                    content: "У Києві представлені заклади різноманітних кухонь світу, від традиційної української до екзотичних азійських."
                }
            ],
            tags: ["визначні місця"]
        },
        "Одеса": {
            sections: [
                {
                    title: "Історія",
                    content: "Одеса заснована в 1794 році за наказом імператриці Катерини II. Місто має багате історичне минуле та унікальну культуру."
                },
                {
                    title: "Пляжі",
                    content: "Одеса відома своїми піщаними пляжами, найпопулярніші з яких - Аркадія, Ланжерон та Отрада."
                },
                {
                    title: "Архітектура",
                    content: "Одеса має унікальну архітектуру з елементами різних стилів, особливо виділяється Оперний театр та Потьомкінські сходи."
                },
                {
                    title: "Ресторани",
                    content: "В Одесі представлені заклади з місцевою кухнею, морепродуктами та інтернаціональними стравами."
                },
                {
                    title: "Інфраструктура",
                    content: "Одеса має розвинену туристичну інфраструктуру з готелями, розважальними закладами та транспортною мережею."
                }
            ],
            tags: ["пляжі", "розваги"]
        },
        "Карпати": {
            sections: [
                {
                    title: "Історія",
                    content: "Карпати - стародавні гори, які формувалися протягом мільйонів років. Вони є домівкою для багатьох етнічних груп і мають багату культурну спадщину."
                },
                {
                    title: "Природа",
                    content: "Карпати відомі мальовничими краєвидами, гірськими хребтами, водоспадами та унікальною фауною і флорою."
                },
                {
                    title: "Активний відпочинок",
                    content: "Карпати - ідеальне місце для активного відпочинку: походів, лижного спорту, велосипедних прогулянок та рафтингу."
                },
                {
                    title: "Курорти",
                    content: "Буковель, Драгобрат, Яремче - популярні курорти, які пропонують комфортний відпочинок у горах."
                }
            ],
            tags: ["визначні місця", "розваги"]
        },
        "Харків": {
            sections: [
                {
                    title: "Історія",
                    content: "Харків - одне з найбільших міст України, засноване в 1654 році. З 1919 по 1934 рік був столицею УРСР."
                },
                {
                    title: "Освіта",
                    content: "Харків - важливий освітній центр України з численними університетами та науковими установами."
                },
                {
                    title: "Пам'ятки",
                    content: "Площа Свободи, Держпром, Сад Шевченка, Харківський національний університет - важливі визначні місця міста."
                },
                {
                    title: "Інфраструктура",
                    content: "Харків має розвинену транспортну систему, включаючи метро, трамваї, тролейбуси та автобуси."
                }
            ],
            tags: ["визначні місця", "розваги"]
        },
        "Львів": {
            sections: [
                {
                    title: "Історія",
                    content: "Львів заснований в 1256 році князем Данилом Галицьким. Історичний центр міста внесений до списку Світової спадщини ЮНЕСКО."
                },
                {
                    title: "Архітектура",
                    content: "Львів славиться своєю архітектурою різних епох і стилів - від готики до модерну."
                },
                {
                    title: "Кав'ярні",
                    content: "Львів відомий як кавова столиця України з унікальними кав'ярнями та багатою культурою споживання кави."
                },
                {
                    title: "Ресторани",
                    content: "У Львові можна знайти багато автентичних ресторанів з галицькою та європейською кухнею."
                },
                {
                    title: "Інфраструктура",
                    content: "Львів має розвинену туристичну інфраструктуру з готелями різних категорій та зручним транспортним сполученням."
                }
            ],
            tags: ["визначні місця", "розваги"]
        },
        "Івано-Франківськ": {
            sections: [
                {
                    title: "Історія",
                    content: "Івано-Франківськ (колишній Станіславів) заснований у 1662 році. Місто назване на честь видатного українського письменника Івана Франка."
                },
                {
                    title: "Архітектура",
                    content: "Місто відоме своєю австрійською архітектурою, старовинними церквами та затишними площами."
                },
                {
                    title: "Розташування",
                    content: "Івано-Франківськ є відправною точкою для подорожей у Карпати та відвідування курортів."
                },
                {
                    title: "Культура",
                    content: "Місто має багате культурне життя з театрами, музеями та щорічними фестивалями."
                }
            ],
            tags: ["визначні місця"]
        },
        "Чернігів": {
            sections: [
                {
                    title: "Історія",
                    content: "Чернігів - одне з найдавніших міст України, перша згадка датується 907 роком. Місто було важливим центром Київської Русі."
                },
                {
                    title: "Пам'ятки",
                    content: "Чернігів відомий своїми давньоруськими храмами, такими як Спасо-Преображенський собор, Борисоглібський собор та Єлецький монастир."
                },
                {
                    title: "Природа",
                    content: "Місто розташоване на берегах річки Десна, що створює мальовничі краєвиди та можливості для відпочинку на природі."
                },
                {
                    title: "Культура",
                    content: "У Чернігові працюють численні музеї, театри та проводяться фестивалі, що зберігають та розвивають місцеву культурку."
                }
            ],
            tags: ["розваги"]
        },
        "Ужгород": {
            sections: [
                {
                    title: "Історія",
                    content: "Ужгород має тисячолітню історію, перші згадки датуються 872 роком. За свою історію місто належало до різних країн."
                },
                {
                    title: "Архітектура",
                    content: "В Ужгороді можна побачити унікальне поєднання різних архітектурних стилів - від середньовічного замку до будівель чеського конструктивізму."
                },
                {
                    title: "Природа",
                    content: "Місто славиться своєю найдовшою липовою алеєю в Європі та цвітінням сакури навесні."
                },
                {
                    title: "Кухня",
                    content: "В Ужгороді можна спробувати унікальну закарпатську кухню, що поєднує українські, угорські, словацькі та інші кулінарні традиції."
                }
            ],
            tags: ["розваги"]
        },
        "Лондон": {
            sections: [
                {
                    title: "Історія",
                    content: "Лондон - столиця Великобританії з історією понад 2000 років. Місто було засноване римлянами у 43 році н.е."
                },
                {
                    title: "Пам'ятки",
                    content: "Біг-Бен, Тауер, Букінгемський палац, Лондонське око - лише деякі з багатьох визначних місць столиці."
                },
                {
                    title: "Інфраструктура",
                    content: "Лондон має розвинену інфраструктуру з метро, автобусними маршрутами та сучасними торговими центрами."
                },
                {
                    title: "Ресторани",
                    content: "У Лондоні представлені заклади різноманітних кухонь світу, від традиційної британської до екзотичних азійських та африканських."
                }
            ],
            tags: ["визначні місця", "розваги"]
        },
        "Манчестер": {
            sections: [
                {
                    title: "Історія",
                    content: "Манчестер відіграв ключову роль в промисловій революції 18-19 століть і був одним з перших індустріальних міст світу."
                },
                {
                    title: "Спорт",
                    content: "Місто відоме своїми футбольними клубами - Manchester United та Manchester City, які мають мільйони фанатів по всьому світу."
                },
                {
                    title: "Музика",
                    content: "Манчестер - батьківщина таких відомих музичних гуртів як Oasis, The Smiths, Joy Division та багатьох інших."
                },
                {
                    title: "Архітектура",
                    content: "У місті можна побачити поєднання індустріальної архітектури з сучасними будівлями та історичними пам'ятками."
                }
            ],
            tags: ["розваги", "визначні місця"]
        },
        "Ліверпуль": {
            sections: [
                {
                    title: "Історія",
                    content: "Ліверпуль був одним з найважливіших портів Британської імперії. Його доки внесені до списку Світової спадщини ЮНЕСКО."
                },
                {
                    title: "Музика",
                    content: "Ліверпуль - батьківщина легендарного гурту The Beatles. Тут можна відвідати музей групи та знамениті місця, пов'язані з їхньою історією."
                },
                {
                    title: "Спорт",
                    content: "Місто має два відомі футбольні клуби - Liverpool FC та Everton FC, які є частиною ідентичності міста."
                },
                {
                    title: "Культура",
                    content: "У Ліверпулі багато музеїв, галерей та театрів, місто було культурною столицею Європи у 2008 році."
                }
            ],
            tags: ["визначні місця", "розваги"]
        },
        "Оксфорд": {
            sections: [
                {
                    title: "Історія",
                    content: "Оксфорд - місто з багатовіковою історією, відоме своїм університетом, заснованим у 12 столітті, що є одним з найстаріших у світі."
                },
                {
                    title: "Освіта",
                    content: "Оксфордський університет складається з 38 коледжів, які вражають своєю архітектурою та історичним значенням."
                },
                {
                    title: "Архітектура",
                    content: "Місто називають 'містом шпилів мрійних' через його неповторну готичну архітектуру та історичні будівлі."
                },
                {
                    title: "Література",
                    content: "Оксфорд пов'язаний з такими літературними творами як 'Аліса в Країні Чудес', 'Володар перснів' та 'Гаррі Поттер'."
                }
            ],
            tags: ["визначні місця", "розваги"]
        },
        "Париж": {
            sections: [
                {
                    title: "Історія",
                    content: "Париж має багату історію, що сягає понад 2000 років. За цей час місто було центром мистецтва, культури та політики Європи."
                },
                {
                    title: "Пам'ятки",
                    content: "Ейфелева вежа, Лувр, Нотр-Дам, Монмартр, Єлисейські поля - всесвітньо відомі символи Парижа, які щороку приваблюють мільйони туристів."
                },
                {
                    title: "Мистецтво",
                    content: "Париж - столиця мистецтва з численними музеями, галереями та художніми кварталами."
                },
                {
                    title: "Кухня",
                    content: "Місто славиться своєю гастрономією, вишуканими ресторанами та кулінарними традиціями."
                },
                {
                    title: "Інфраструктура",
                    content: "Розвинена мережа метро, автобусів та велосипедних доріжок робить пересування містом зручним та ефективним."
                }
            ],
            tags: ["визначні місця", "розваги"]
        },
        "Ніцца": {
            sections: [
                {
                    title: "Історія",
                    content: "Ніцца була заснована греками у 350 році до н.е. Протягом історії місто перебувало під владою італійців, а до Франції остаточно приєдналося лише у 1860 році."
                },
                {
                    title: "Пляжі",
                    content: "Знаменита Англійська набережна (Promenade des Anglais) простягається вздовж Середземного моря і є символом міста разом з галечними пляжами."
                },
                {
                    title: "Культура",
                    content: "Ніцца славиться своїми музеями, зокрема Музеєм Марка Шагала та Музеєм сучасного мистецтва."
                },
                {
                    title: "Кухня",
                    content: "Місцева кухня поєднує французькі та італійські традиції, відома своїми стравами з морепродуктів та овочів."
                }
            ],
            tags: ["пляжі", "розваги"]
        },
        "Ліон": {
            sections: [
                {
                    title: "Історія",
                    content: "Ліон був заснований римлянами у 43 році до н.е. Історичний центр міста внесений до списку Світової спадщини ЮНЕСКО."
                },
                {
                    title: "Гастрономія",
                    content: "Ліон вважається гастрономічною столицею Франції, відомий своїми традиційними ресторанами (бушонами) та високою кухнею."
                },
                {
                    title: "Архітектура",
                    content: "Місто славиться своєю ренесансною архітектурою, особливо в районі Старого Ліона з його унікальними критими переходами."
                },
                {
                    title: "Культура",
                    content: "У Ліоні щороку проводиться знаменитий Фестиваль світла, який приваблює мільйони відвідувачів з усього світу."
                }
            ],
            tags: ["пляжі", "визначні місця", "розваги"]
        },
        "Марсель": {
            sections: [
                {
                    title: "Історія",
                    content: "Марсель - найстаріше місто Франції, засноване греками у 600 році до н.е. Протягом історії був важливим середземноморським портом."
                },
                {
                    title: "Порт",
                    content: "Старий порт (Vieux Port) є серцем міста, оточений ресторанами, кафе та історичними будівлями."
                },
                {
                    title: "Пам'ятки",
                    content: "Базиліка Нотр-Дам-де-ла-Гард, що височіє над містом, та замок Іф, відомий за романом 'Граф Монте-Крісто', є символами Марселя."
                },
                {
                    title: "Кухня",
                    content: "Марсель відомий своїм буябесом - традиційним рибним супом, та іншими стравами з морепродуктів."
                }
            ],
            tags: ["пляжі", "визначні місця"]
        },
        "Дубай": {
            sections: [
                {
                    title: "Історія",
                    content: "Дубай трансформувався з невеликого рибальського селища в ультрасучасний мегаполіс протягом останніх 50 років завдяки відкриттю нафти."
                },
                {
                    title: "Архітектура",
                    content: "Місто славиться футуристичними хмарочосами, включаючи найвищу будівлю світу - Бурдж Халіфа (828 метрів)."
                },
                {
                    title: "Шопінг",
                    content: "Дубай - світовий центр шопінгу з численними торговими центрами, включаючи Dubai Mall - один з найбільших у світі."
                },
                {
                    title: "Розваги",
                    content: "Аквапарки, штучні острови, гірськолижний комплекс у пустелі та інші атракції роблять Дубай унікальним туристичним напрямком."
                }
            ],
            tags: ["пляжі", "розваги"]
        },
        "Абу-Дабі": {
            sections: [
                {
                    title: "Історія",
                    content: "Абу-Дабі - столиця та найбільший емірат ОАЕ, який розвинувся з невеликого поселення в сучасне місто завдяки нафтовим багатствам."
                },
                {
                    title: "Архітектура",
                    content: "Велика мечеть шейха Заїда - одна з найбільших мечетей у світі, вражає білосніжним мармуром та розкішним оздобленням."
                },
                {
                    title: "Культура",
                    content: "Музей Лувр Абу-Дабі, розроблений Жаном Нувелем, представляє мистецтво з усього світу під своїм вражаючим куполом."
                },
                {
                    title: "Розваги",
                    content: "Парк розваг Ferrari World, Yas Waterworld та траса Формули-1 на острові Яс є популярними туристичними атракціями."
                }
            ],
            tags: ["пляжі", "визначні місця", "розваги"]
        },
        "Шарджа": {
            sections: [
                {
                    title: "Історія",
                    content: "Шарджа - третій за величиною емірат ОАЕ, який зберігає багату ісламську культуру та традиції."
                },
                {
                    title: "Культура",
                    content: "Місто було обране культурною столицею арабського світу та відоме своїми численними музеями та галереями."
                },
                {
                    title: "Архітектура",
                    content: "У Шарджі збереглися традиційні арабські будівлі та квартали, що відображають історичну спадщину регіону."
                },
                {
                    title: "Ринки",
                    content: "Традиційні ринки (соуки) пропонують автентичні арабські товари, від спецій до золотих прикрас."
                }
            ],
            tags: ["визначні місця", "розваги"]
        },
        "Фуджейра": {
            sections: [
                {
                    title: "Історія",
                    content: "Фуджейра - єдиний емірат ОАЕ, розташований повністю на східному узбережжі країни, біля Оманської затоки."
                },
                {
                    title: "Природа",
                    content: "Емірат відомий своїми гірськими пейзажами хребта Хаджар та кришталево чистими водами Індійського океану."
                },
                {
                    title: "Пляжі",
                    content: "Узбережжя Фуджейри пропонує відмінні можливості для дайвінгу та снорклінгу завдяки багатому підводному світу."
                },
                {
                    title: "Пам'ятки",
                    content: "Форт Фуджейри, мечеть Аль-Бідья (найстаріша в ОАЕ) та інші історичні місця приваблюють туристів."
                }
            ],
            tags: ["пляжі", "визначні місця"]
        },
        "Рим": {
            sections: [
                {
                    title: "Історія",
                    content: "Рим, заснований згідно з легендою у 753 році до н.е., був столицею могутньої Римської імперії та є одним з найдавніших міст Європи."
                },
                {
                    title: "Архітектура",
                    content: "Місто-музей під відкритим небом, де античні пам'ятки (Колізей, Форум, Пантеон) співіснують з ренесансними та бароковими шедеврами."
                },
                {
                    title: "Ватикан",
                    content: "У межах Рима розташована незалежна держава Ватикан - центр католицької церкви з Собором святого Петра та Сикстинською капелою."
                },
                {
                    title: "Кухня",
                    content: "Римська кухня славиться своєю пастою (карбонара, аматричана), піцею та неперевершеним морозивом (джелато)."
                }
            ],
            tags: ["визначні місця", "розваги"]
        },
        "Венеція": {
            sections: [
                {
                    title: "Історія",
                    content: "Венеція була заснована у 5 столітті н.е. як притулок від варварських навал і розвинулася в могутню морську республіку."
                },
                {
                    title: "Архітектура",
                    content: "Місто на воді з 118 островів, з'єднаних понад 400 мостами, зберегло свою унікальну середньовічну та ренесансну архітектуру."
                },
                {
                    title: "Канали",
                    content: "Гранд-канал - головна водна артерія міста, оточена палацами та будинками венеціанської знаті різних епох."
                },
                {
                    title: "Мистецтво",
                    content: "Венеція - колиска італійського Ренесансу, місто славиться своїми музеями, церквами та Бієнале - всесвітньо відомою виставкою сучасного мистецтва."
                }
            ],
            tags: ["визначні місця", "розваги"]
        },
        "Флоренція": {
            sections: [
                {
                    title: "Історія",
                    content: "Флоренція - колиска епохи Відродження, де творили Леонардо да Вінчі, Мікеланджело, Данте та інші генії."
                },
                {
                    title: "Мистецтво",
                    content: "Галерея Уффіці, Палаццо Пітті, Галерея Академії (де зберігається оригінал 'Давида' Мікеланджело) - скарбниці світового мистецтва."
                },
                {
                    title: "Архітектура",
                    content: "Собор Санта-Марія-дель-Фіоре з його знаменитим куполом Брунеллескі є символом міста та шедевром ренесансної архітектури."
                },
                {
                    title: "Кухня",
                    content: "Тосканська кухня Флоренції відома своїми м'ясними стравами, зокрема флорентійським стейком (bistecca alla fiorentina)."
                }
            ],
            tags: ["визначні місця", "розваги"]
        },
        "Мілан": {
            sections: [
                {
                    title: "Історія",
                    content: "Мілан - економічна столиця Італії з багатою історією, що сягає римських часів. Місто відіграло важливу роль у часи Ренесансу."
                },
                {
                    title: "Мода",
                    content: "Світова столиця моди, де розташовані штаб-квартири Prada, Armani, Versace та інших відомих брендів."
                },
                {
                    title: "Архітектура",
                    content: "Міланський собор (Дуомо) - один з найбільших готичних соборів світу, а також середньовічний замок Сфорца є символами міста."
                },
                {
                    title: "Мистецтво",
                    content: "У Мілані зберігається фреска 'Таємна вечеря' Леонардо да Вінчі, а також працюють численні галереї та музеї."
                }
            ],
            tags: ["розваги", "визначні місця"]
        },
    };

    return cityData[cityName] || { sections: [] };
};

export default getCityInfo;