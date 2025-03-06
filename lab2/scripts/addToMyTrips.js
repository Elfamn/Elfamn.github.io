document.addEventListener('DOMContentLoaded', function () {
    const addButtons = document.querySelectorAll('.add-to-trip-btn');

    createTripModal();

    addButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const place = this.getAttribute('data-place');
            const country = this.getAttribute('data-country');
            openTripModal(place, country);
        });
    });

    function createTripModal() {
        const modal = document.createElement('div');
        modal.id = 'trip-modal';
        modal.className = 'modal';

        const modalContent = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2>Додати до моїх подорожей</h2>
                <div class="place-info">
                    <h3 id="modal-place-name">Місце</h3>
                    <p id="modal-country-name">Країна</p>
                </div>
                
                <div class="trip-type-selection">
                    <h4>Виберіть тип:</h4>
                    <div class="trip-type-buttons">
                        <button id="plan-btn" class="trip-type-btn active">План</button>
                        <button id="visited-btn" class="trip-type-btn">Відвідано</button>
                    </div>
                </div>
                
                <div id="plan-form" class="trip-form active">
                    <div class="form-group">
                        <label for="plan-start-date">Дата початку:</label>
                        <input type="date" id="plan-start-date" required>
                    </div>
                    <div class="form-group">
                        <label for="plan-end-date">Дата завершення:</label>
                        <input type="date" id="plan-end-date" required>
                    </div>
                    <div class="form-group">
                        <label for="plan-expectations">Ваші очікування:</label>
                        <textarea id="plan-expectations" rows="4" placeholder="Розкажіть, що ви хочете відвідати, спробувати..."></textarea>
                    </div>
                </div>
                
                <div id="visited-form" class="trip-form">
                    <div class="form-group">
                        <label for="visited-start-date">Дата відвідування:</label>
                        <input type="date" id="visited-start-date" required>
                    </div>
                    <div class="form-group">
                        <label for="visited-end-date">Дата повернення:</label>
                        <input type="date" id="visited-end-date" required>
                    </div>
                    <div class="form-group">
                        <label for="visited-impressions">Ваші враження:</label>
                        <textarea id="visited-impressions" rows="4" placeholder="Розкажіть про ваші враження від відвідування..."></textarea>
                    </div>
                    <div class="form-group">
                        <label>Ваша оцінка:</label>
                        <div class="star-rating">
                            <input type="radio" id="star5" name="rating" value="5">
                            <label for="star5" title="5 зірок">&#9733;</label>
                            <input type="radio" id="star4" name="rating" value="4">
                            <label for="star4" title="4 зірки">&#9733;</label>
                            <input type="radio" id="star3" name="rating" value="3">
                            <label for="star3" title="3 зірки">&#9733;</label>
                            <input type="radio" id="star2" name="rating" value="2">
                            <label for="star2" title="2 зірки">&#9733;</label>
                            <input type="radio" id="star1" name="rating" value="1">
                            <label for="star1" title="1 зірка">&#9733;</label>
                        </div>
                    </div>
                </div>
                
                <div class="modal-buttons">
                    <button id="save-trip-btn" class="primary-btn">Зберегти</button>
                    <button id="cancel-trip-btn" class="secondary-btn">Скасувати</button>
                </div>
            </div>
        `;

        modal.innerHTML = modalContent;
        document.body.appendChild(modal);

        setupModalEventListeners();
    }

    function setupModalEventListeners() {
        const modal = document.getElementById('trip-modal');
        const closeBtn = modal.querySelector('.close-modal');
        const cancelBtn = document.getElementById('cancel-trip-btn');
        const saveBtn = document.getElementById('save-trip-btn');
        const planBtn = document.getElementById('plan-btn');
        const visitedBtn = document.getElementById('visited-btn');
        const planForm = document.getElementById('plan-form');
        const visitedForm = document.getElementById('visited-form');

        closeBtn.addEventListener('click', closeModal);
        cancelBtn.addEventListener('click', closeModal);

        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });

        planBtn.addEventListener('click', function () {
            planBtn.classList.add('active');
            visitedBtn.classList.remove('active');
            planForm.classList.add('active');
            visitedForm.classList.remove('active');
        });

        visitedBtn.addEventListener('click', function () {
            visitedBtn.classList.add('active');
            planBtn.classList.remove('active');
            visitedForm.classList.add('active');
            planForm.classList.remove('active');
        });

        saveBtn.addEventListener('click', function () {
            saveTripData();
        });
    }

    function openTripModal(place, country) {
        const modal = document.getElementById('trip-modal');
        const placeName = document.getElementById('modal-place-name');
        const countryName = document.getElementById('modal-country-name');

        placeName.textContent = place;
        countryName.textContent = country;

        const today = new Date().toISOString().split('T')[0];
        document.getElementById('plan-start-date').value = today;
        document.getElementById('plan-end-date').value = today;
        document.getElementById('visited-start-date').value = today;
        document.getElementById('visited-end-date').value = today;

        modal.style.display = 'flex';
    }

    function closeModal() {
        const modal = document.getElementById('trip-modal');
        modal.style.display = 'none';
    }

    function saveTripData() {
        const place = document.getElementById('modal-place-name').textContent;
        const country = document.getElementById('modal-country-name').textContent;
        const isPlan = document.getElementById('plan-btn').classList.contains('active');

        let tripData = {
            place: place,
            country: country,
            type: isPlan ? 'План' : 'Відвідано',
            id: Date.now()
        };

        if (isPlan) {
            const startDate = document.getElementById('plan-start-date').value;
            const endDate = document.getElementById('plan-end-date').value;
            const expectations = document.getElementById('plan-expectations').value;

            if (!startDate || !endDate) {
                alert('Будь ласка, введіть дати початку та завершення подорожі.');
                return;
            }

            tripData.startDate = startDate;
            tripData.endDate = endDate;
            tripData.description = expectations;
        } else {
            const startDate = document.getElementById('visited-start-date').value;
            const endDate = document.getElementById('visited-end-date').value;
            const impressions = document.getElementById('visited-impressions').value;
            const ratingInput = document.querySelector('input[name="rating"]:checked');

            if (!startDate || !endDate) {
                alert('Будь ласка, введіть дати відвідування та повернення.');
                return;
            }

            if (!ratingInput) {
                alert('Будь ласка, оцініть ваше відвідування.');
                return;
            }

            const rating = ratingInput.value;

            tripData.startDate = startDate;
            tripData.endDate = endDate;
            tripData.description = impressions;
            tripData.rating = rating;
        }

        saveToLocalStorage(tripData);
        if (!window.location.href.includes('myTrips.html')) {
            if (confirm('Подорож успішно додано! Перейти до сторінки "Мої подорожі"?')) {
                window.location.href = 'myTrips.html';
                return;
            }
        }

        showAddSuccessMessage(place);
        console.log('Saving trip:', tripData);
        console.log('Current trips:', JSON.parse(localStorage.getItem('myTrips')));
        closeModal();
    }

    function saveToLocalStorage(tripData) {
        let myTrips = JSON.parse(localStorage.getItem('myTrips')) || [];
        myTrips.push(tripData);
        localStorage.setItem('myTrips', JSON.stringify(myTrips));
        if (window.location.href.includes('myTrips.html')) {
            addTripCardToPage(tripData);
        }
    }

    function showAddSuccessMessage(place) {
        const buttons = document.querySelectorAll('.add-to-trip-btn');
        let targetButton;

        buttons.forEach(button => {
            if (button.getAttribute('data-place') === place) {
                targetButton = button;
            }
        });

        if (targetButton) {
            const successMessage = targetButton.nextElementSibling;

            if (successMessage && successMessage.classList.contains('add-success-message')) {
                successMessage.style.display = 'block';

                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 3000);
            } else {
                const newSuccessMessage = document.createElement('p');
                newSuccessMessage.className = 'add-success-message';
                newSuccessMessage.textContent = 'Додано до ваших подорожей!';
                newSuccessMessage.style.display = 'block';

                targetButton.parentNode.insertBefore(newSuccessMessage, targetButton.nextSibling);

                setTimeout(() => {
                    newSuccessMessage.style.display = 'none';
                }, 3000);
            }
        }
    }

    function getImageFileName(placeName) {
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
            'івано-франківсь': 'ivano-frankivsk',
            'лондон': 'london',
            'карпати': 'karpaty',
            'марсель': 'marseille',
            'ліон': 'lyon',
            'манчестер': 'manchester',
            'ніца': 'nice',
            'одеса': 'odessa',
            'ужгород': 'uzhgorod',
            'харків': 'kharkiv',
            'чернігів': 'chernihiv',
            'шарджа': 'sharjah',
            'ліверпуль': 'liverpool',
        };

        const lowercaseName = placeName.toLowerCase();
        return placeToImage[lowercaseName] || lowercaseName;
    }

    function addTripCardToPage(tripData) {
        const tripsList = document.querySelector('.trips-list');
        if (!tripsList) {
            console.log('Could not find .trips-list element');
            return;
        }
        if (!tripData || !tripData.place) {
            console.error('Invalid trip data:', tripData);
            return;
        }

        const statusClass = tripData.type === 'План' ? 'plan-status' : 'visited-status';
        const startDateObj = new Date(tripData.startDate);
        const endDateObj = new Date(tripData.endDate);

        const formattedStartDate = `${startDateObj.getDate().toString().padStart(2, '0')}.${(startDateObj.getMonth() + 1).toString().padStart(2, '0')}.${startDateObj.getFullYear()}`;
        const formattedEndDate = `${endDateObj.getDate().toString().padStart(2, '0')}.${(endDateObj.getMonth() + 1).toString().padStart(2, '0')}.${endDateObj.getFullYear()}`;

        let ratingStars = '';
        if (tripData.type === 'Відвідано' && tripData.rating) {
            ratingStars = `<div class="trip-rating">`;
            for (let i = 0; i < parseInt(tripData.rating); i++) {
                ratingStars += `<span class="star">⭐</span>`;
            }
            ratingStars += `</div>`;
        }

        let imageFileName;
        switch (tripData.place.toLowerCase()) {
            case 'дубай': imageFileName = 'dubai'; break;
            case 'київ': imageFileName = 'kyiv'; break;
            case 'мілан': imageFileName = 'milan'; break;
            case 'париж': imageFileName = 'paris'; break;
            case 'рим': imageFileName = 'rome'; break;
            case 'абу-дабі': imageFileName = 'abu-dhabi'; break;
            case 'львів': imageFileName = 'lviv'; break;
            case 'флоренція': imageFileName = 'florence'; break;
            case 'фурджейра': imageFileName = 'fujairah'; break;
            case 'івано-франківсь': imageFileName = 'ivano-frankivsk'; break;
            case 'лондон': imageFileName = 'london'; break;
            case 'карпати': imageFileName = 'karpaty'; break;
            case 'марсель': imageFileName = 'marseille'; break;
            case 'ліон': imageFileName = 'lyon'; break;
            case 'манчестер': imageFileName = 'manchester'; break;
            case 'ніцца': imageFileName = 'nice'; break;
            case 'одеса': imageFileName = 'odessa'; break;
            case 'ужгород': imageFileName = 'uzhgorod'; break;
            case 'харків': imageFileName = 'kharkiv'; break;
            case 'чернігів': imageFileName = 'chernihiv'; break;
            case 'шарджа': imageFileName = 'sharjah'; break;
            case 'ліверпуль': imageFileName = 'liverpool'; break;
            default: imageFileName = tripData.place.toLowerCase();
        }

        const tripCardHTML = `
        <div class="trip-card ${statusClass}" data-id="${tripData.id}">
            <img src="images/${imageFileName}.jpg" 
                 onerror="console.log('Image not found, using fallback'); this.src='images/travel-background.jpg';" 
                 alt="${tripData.place}">
            <div class="trip-info">
                    <div class="trip-header">
                        <h3>${tripData.place}</h3>
                        <span class="trip-status">${tripData.type}</span>
                    </div>
                    <p class="trip-country">${tripData.country}</p>
                    <p class="trip-date">${formattedStartDate} - ${formattedEndDate}</p>
                    <p class="trip-description">${tripData.description || ''}</p>
                    ${ratingStars}
                </div>
            </div>
        `;

        tripsList.insertAdjacentHTML('afterbegin', tripCardHTML);
    }

    if (window.location.href.includes('myTrips.html')) {
        loadSavedTrips();
    }

    function loadSavedTrips() {
        const myTrips = JSON.parse(localStorage.getItem('myTrips')) || [];
        const tripsList = document.querySelector('.trips-list');

        if (!tripsList) return;

        const existingCards = tripsList.querySelectorAll('.trip-card');
        existingCards.forEach(card => {
            // Перевіряємо, чи має карточка атрибут data-id
            // Якщо ні, то це шаблон і його не видаляємо
            if (card.hasAttribute('data-id')) {
                card.remove();
            }
        });

        myTrips.forEach(tripData => {
            addTripCardToPage(tripData);
        });
    }
});