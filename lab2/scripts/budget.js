document.addEventListener("DOMContentLoaded", function () {
    const budgetInput = document.getElementById("budget");
    const expenseTable = document.querySelector(".expense-table tbody");
    const totalExpenseField = document.querySelector("tfoot td input");
    const budgetSummaryExpense = document.querySelector(".budget-summary p strong + input");
    const form = document.getElementById("expense-form");
    const categorySelect = document.getElementById("expense-category");
    const descriptionInput = document.getElementById("expense-description");
    const quantityInput = document.getElementById("expense-quantity");
    const priceInput = document.getElementById("expense-price");

    console.log("Form elements found:", {
        form: form,
        categorySelect: categorySelect,
        descriptionInput: descriptionInput,
        quantityInput: quantityInput,
        priceInput: priceInput
    });

    let expenses = [];
    let destinationPrices = {};

    function loadFromLocalStorage() {
        const savedBudget = localStorage.getItem('userBudget');
        const savedExpenses = localStorage.getItem('userExpenses');

        if (savedBudget) {
            budgetInput.value = savedBudget;
        }

        if (savedExpenses) {
            expenses = JSON.parse(savedExpenses);
        }

        updateExpenseTable();
        updateBudget();
    }

    // Збереження даних в localStorage
    function saveToLocalStorage() {
        localStorage.setItem('userBudget', budgetInput.value);
        localStorage.setItem('userExpenses', JSON.stringify(expenses));
        console.log("Дані збережено в localStorage");
    }

    async function fetchDestinationPrices() {
        try {
            const response = await fetch('countries.html');
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const placeItems = doc.querySelectorAll('.place-item');

            placeItems.forEach(place => {
                const placeName = place.querySelector('h3').textContent.trim();
                const priceText = place.querySelector('p:nth-of-type(2)').textContent.trim();
                const priceMatch = priceText.match(/від\s+(\d+)\s+грн/i);
                if (priceMatch && priceMatch[1]) {
                    const price = parseInt(priceMatch[1]);
                    destinationPrices[placeName] = price;
                }
            });

            updateDestinationOptions();

            console.log('Завантажені ціни для місць:', destinationPrices);
        } catch (error) {
            console.error('Помилка при завантаженні цін:', error);
        }
    }

    function updateDestinationOptions() {
        const destinationSelect = document.getElementById("destination");
        if (destinationSelect) {
            destinationSelect.innerHTML = '<option value="">Виберіть місце</option>';

            Object.keys(destinationPrices).sort().forEach(place => {
                const option = document.createElement('option');
                option.value = place;
                option.textContent = place;
                destinationSelect.appendChild(option);
            });
        }
    }

    function createDestinationSection() {
        const budgetSection = document.querySelector('.budget-section .container');

        const tripDetailsDiv = document.createElement('div');
        tripDetailsDiv.className = 'trip-details';
        tripDetailsDiv.innerHTML = `
            <h3>Деталі подорожі</h3>
            <div class="trip-inputs">
                <div>
                    <label for="destination">Місце призначення:</label>
                    <select id="destination">
                        <option value="">Завантаження місць...</option>
                    </select>
                </div>
                <div>
                    <label for="duration">Тривалість (днів):</label>
                    <input type="number" id="duration" min="1" value="1">
                </div>
                <div>
                    <label for="trip-cost">Вартість подорожі:</label>
                    <input type="number" id="trip-cost" readonly>
                </div>
                <div>
                    <label for="trip-category">Категорія витрат:</label>
                    <select id="trip-category">
                        <option value="Подорож">Подорож</option>
                    </select>
                </div>
                <button type="button" id="add-to-budget">Додати до бюджету</button>
            </div>
        `;

        const budgetSummary = document.querySelector('.budget-summary');
        budgetSummary.insertAdjacentElement('afterend', tripDetailsDiv);
    }

    createDestinationSection();
    fetchDestinationPrices();
    loadFromLocalStorage();

    const destinationSelect = document.getElementById("destination");
    const durationInput = document.getElementById("duration");
    const tripCostField = document.getElementById("trip-cost");
    const tripCategorySelect = document.getElementById("trip-category");
    const addToBudgetBtn = document.getElementById("add-to-budget");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        console.log("Form submitted!");

        const category = categorySelect.value;
        const description = descriptionInput.value;
        const quantity = parseFloat(quantityInput.value);
        const price = parseFloat(priceInput.value);

        console.log("Form data:", {
            category: category,
            description: description,
            quantity: quantity,
            price: price
        });

        if (!description || isNaN(quantity) || isNaN(price) || quantity <= 0 || price <= 0) {
            alert("Будь ласка, заповніть всі поля коректно!");
            console.error("Form validation failed:", {
                description: !description,
                quantityNaN: isNaN(quantity),
                priceNaN: isNaN(price),
                quantityTooSmall: quantity <= 0,
                priceTooSmall: price <= 0
            });
            return;
        }

        const total = quantity * price;
        const newExpense = { category, description, quantity, price, total };
        expenses.push(newExpense);
        console.log("Added new expense:", newExpense);
        console.log("All expenses:", expenses);

        updateExpenseTable();
        updateBudget();
        saveToLocalStorage();
        form.reset();
    });

    addToBudgetBtn.addEventListener("click", function () {
        const destination = destinationSelect.value;
        const duration = parseInt(durationInput.value) || 0;
        const category = tripCategorySelect.value;

        console.log("Add to budget clicked:", {
            destination: destination,
            duration: duration,
            category: category
        });

        if (!destination || duration <= 0) {
            alert("Будь ласка, виберіть місце та вкажіть тривалість подорожі!");
            return;
        }

        const tripCost = parseFloat(tripCostField.value);
        const newExpense = {
            category: category,
            description: `Подорож до ${destination} на ${duration} днів`,
            quantity: 1,
            price: tripCost,
            total: tripCost
        };
        expenses.push(newExpense);
        console.log("Added trip expense:", newExpense);
        console.log("All expenses:", expenses);

        updateExpenseTable();
        updateBudget();
        saveToLocalStorage();

        destinationSelect.value = "";
        durationInput.value = "1";
        tripCostField.value = "";
        tripCategorySelect.selectedIndex = 0;
    });

    function updateTripCost() {
        const destination = destinationSelect.value;
        const duration = parseInt(durationInput.value) || 0;

        if (destination && duration > 0) {
            const costPerDay = destinationPrices[destination] || 0;
            const totalCost = costPerDay * duration;
            tripCostField.value = totalCost;
        } else {
            tripCostField.value = "";
        }
    }

    function updateExpenseTable() {
        console.log("Updating expense table with:", expenses);
        expenseTable.innerHTML = "";
        expenses.forEach((expense, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${expense.category}</td>
                <td>${expense.description}</td>
                <td>${expense.quantity}</td>
                <td>${expense.price.toFixed(2)} ₴</td>
                <td>${expense.total.toFixed(2)} ₴</td>
                <td><button class="delete-btn" data-index="${index}">❌</button></td>
            `;

            row.querySelector(".delete-btn").addEventListener("click", function () {
                console.log("Deleting expense at index:", index);
                expenses.splice(index, 1);
                updateExpenseTable();
                updateBudget();
                saveToLocalStorage();
            });

            expenseTable.appendChild(row);
        });
    }

    function updateBudget() {
        const totalExpenses = expenses.reduce((sum, exp) => sum + exp.total, 0);
        console.log("Total expenses calculated:", totalExpenses);
        totalExpenseField.value = totalExpenses.toFixed(2);
        budgetSummaryExpense.value = totalExpenses.toFixed(2);

        const budget = parseFloat(budgetInput.value) || 0;

        let remainingBudgetField = document.querySelector(".budget-summary p:nth-child(3) input");
        if (!remainingBudgetField) {
            const remainingElem = document.createElement('p');
            remainingElem.innerHTML = '<strong>Залишок бюджету:</strong> <input type="number" value="0" readonly>';
            document.querySelector('.budget-summary').appendChild(remainingElem);
            remainingBudgetField = remainingElem.querySelector('input');
        }

        const remaining = budget - totalExpenses;
        remainingBudgetField.value = remaining.toFixed(2);

        if (remaining < 0) {
            remainingBudgetField.style.color = 'red';
        } else {
            remainingBudgetField.style.color = 'green';
        }
    }

    budgetInput.addEventListener("input", function () {
        updateBudget();
        saveToLocalStorage();
    });

    destinationSelect.addEventListener("change", updateTripCost);
    durationInput.addEventListener("input", updateTripCost);

    document.addEventListener('click', function (e) {
        if (e.target.tagName === 'BUTTON' && e.target.closest('form') === form && e.target.type === 'submit') {
            console.log("Submit button clicked!");
        }
    });

    updateExpenseTable();
    updateBudget();
});