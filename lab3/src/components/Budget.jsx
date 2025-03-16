import React, { useState, useEffect, useRef } from 'react';

function Budget() {
  const [budget, setBudget] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    category: 'Транспорт',
    description: '',
    quantity: '',
    price: ''
  });
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [destinationPrices, setDestinationPrices] = useState({});
  const [tripData, setTripData] = useState({
    destination: '',
    duration: 1,
    tripCost: '',
    category: 'Подорож'
  });

  const descriptionRef = useRef(null);
  const quantityRef = useRef(null);
  const priceRef = useRef(null);
  const destinationRef = useRef(null);
  const durationRef = useRef(null);

  useEffect(() => {
    const savedExpenses = localStorage.getItem('budgetExpenses');
    const savedBudget = localStorage.getItem('totalBudget');

    if (savedExpenses) {
      const parsedExpenses = JSON.parse(savedExpenses);
      setExpenses(parsedExpenses);
      calculateTotal(parsedExpenses);
    }

    if (savedBudget) {
      setBudget(savedBudget);
    }

    fetchDestinationPrices();
  }, []);

  useEffect(() => {
    if (expenses.length > 0 || budget) {
      saveToLocalStorage();
      calculateTotal();
    }
  }, [expenses, budget]);

  useEffect(() => {
    updateTripCost();
  }, [tripData.destination, tripData.duration, destinationPrices]);

  const fetchDestinationPrices = () => {
    const mockPrices = {
      'Львів': 1500,
      'Київ': 2000,
      'Одеса': 2500,
      'Буковель': 3000,
      'Карпати': 2200,
      'Хотин': 1800
    };
    setDestinationPrices(mockPrices);
  };

  const calculateTotal = () => {
    const total = expenses.reduce((sum, expense) => sum + expense.total, 0);
    setTotalExpenses(total);

    const budgetValue = parseFloat(budget) || 0;
    setRemainingBudget(budgetValue - total);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem('budgetExpenses', JSON.stringify(expenses));
    localStorage.setItem('totalBudget', budget);
  };

  const showValidationError = (field, message) => {
    setValidationErrors(prev => ({
      ...prev,
      [field]: message
    }));
  };

  const clearValidationError = (field) => {
    setValidationErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const field = id.replace('expense-', '');

    setFormData({
      ...formData,
      [field]: value
    });

    if (value.trim()) {
      clearValidationError(field);
    }

    if (formData.description.trim() &&
      formData.quantity && parseFloat(formData.quantity) > 0 &&
      formData.price && parseFloat(formData.price) > 0) {
      setFormError('');
    }
  };

  const handleTripDataChange = (e) => {
    const { id, value } = e.target;
    const field = id.replace('trip-', '');

    setTripData({
      ...tripData,
      [field]: value
    });

    if (value.trim()) {
      clearValidationError(field);
    }
  };

  const handleBudgetChange = (e) => {
    const newBudget = e.target.value;
    setBudget(newBudget);
    localStorage.setItem('totalBudget', newBudget);
  };

  const updateTripCost = () => {
    const { destination, duration } = tripData;

    if (destination && duration > 0) {
      const costPerDay = destinationPrices[destination] || 0;
      const totalCost = costPerDay * duration;
      setTripData(prev => ({
        ...prev,
        tripCost: totalCost
      }));
    }
  };

  const validateExpenseForm = () => {
    let isValid = true;
    setFormError('');

    if (!formData.description.trim()) {
      showValidationError('description', 'Введіть будь-ласка опис');
      isValid = false;
    }

    if (!formData.quantity || parseFloat(formData.quantity) <= 0) {
      showValidationError('quantity', 'Введіть будь-ласка кількість');
      isValid = false;
    }

    if (!formData.price || parseFloat(formData.price) <= 0) {
      showValidationError('price', 'Введіть будь-ласка ціну');
      isValid = false;
    }

    if (!isValid) {
      setFormError('Будь ласка, заповніть всі поля коректно!');
    }

    return isValid;
  };

  const validateTripForm = () => {
    let isValid = true;

    if (!tripData.destination) {
      showValidationError('destination', 'Виберіть будь-ласка місце');
      isValid = false;
    }

    if (!tripData.duration || parseInt(tripData.duration) <= 0) {
      showValidationError('duration', 'Введіть будь-ласка тривалість');
      isValid = false;
    }

    if (!isValid) {
      setFormError('Будь ласка, заповніть всі поля коректно!');
    }

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateExpenseForm()) {
      return;
    }

    const newExpense = {
      id: Date.now(),
      category: formData.category,
      description: formData.description,
      quantity: parseFloat(formData.quantity),
      price: parseFloat(formData.price),
      total: parseFloat(formData.quantity) * parseFloat(formData.price)
    };

    setExpenses(prevExpenses => {
      const updatedExpenses = [...prevExpenses, newExpense];
      return updatedExpenses;
    });

    setFormData({
      category: 'Транспорт',
      description: '',
      quantity: '',
      price: ''
    });
  };

  const handleAddTrip = () => {
    if (!validateTripForm()) {
      return;
    }

    const { destination, duration, tripCost, category } = tripData;

    const newExpense = {
      id: Date.now(),
      category,
      description: `Подорож до ${destination} на ${duration} днів`,
      quantity: 1,
      price: parseFloat(tripCost),
      total: parseFloat(tripCost)
    };

    setExpenses([...expenses, newExpense]);

    setTripData({
      destination: '',
      duration: 1,
      tripCost: '',
      category: 'Подорож'
    });
  };

  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  return (
    <section className="budget-section">
      <div className="container">
        <h2>Бюджет</h2>
        <div className="budget-summary">
          <label htmlFor="budget">Загальний бюджет:</label>
          <input
            type="number"
            id="budget"
            placeholder="Введіть бюджет"
            value={budget}
            onChange={handleBudgetChange}
          />
          <p><strong>Загальні витрати:</strong> <input type="number" value={totalExpenses.toFixed(2)} placeholder="₴0.00" readOnly /></p>
          <p><strong>Залишок бюджету:</strong> <input
            type="number"
            value={remainingBudget.toFixed(2)}
            readOnly
            style={{ color: remainingBudget < 0 ? 'red' : 'green' }}
          /></p>
        </div>

        <div className="trip-details">
          <h3>Деталі подорожі</h3>
          <div className="trip-inputs">
            <div>
              <label htmlFor="destination">Місце призначення:</label>
              <select
                id="destination"
                ref={destinationRef}
                value={tripData.destination}
                onChange={handleTripDataChange}
                style={{ borderColor: validationErrors.destination ? 'red' : '' }}
              >
                <option value="">Виберіть місце</option>
                {Object.keys(destinationPrices).sort().map(place => (
                  <option key={place} value={place}>{place}</option>
                ))}
              </select>
              {validationErrors.destination && (
                <div className="validation-error" style={{ color: 'red', fontSize: '12px' }}>
                  {validationErrors.destination}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="duration">Тривалість (днів):</label>
              <input
                type="number"
                id="duration"
                ref={durationRef}
                min="1"
                value={tripData.duration}
                onChange={handleTripDataChange}
                style={{ borderColor: validationErrors.duration ? 'red' : '' }}
              />
              {validationErrors.duration && (
                <div className="validation-error" style={{ color: 'red', fontSize: '12px' }}>
                  {validationErrors.duration}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="trip-cost">Вартість подорожі:</label>
              <input
                type="number"
                id="trip-cost"
                value={tripData.tripCost}
                readOnly
              />
            </div>
            <div>
              <label htmlFor="trip-category">Категорія витрат:</label>
              <select
                id="trip-category"
                value={tripData.category}
                onChange={handleTripDataChange}
              >
                <option value="Подорож">Подорож</option>
              </select>
            </div>
            {formError && (
              <div className="form-error" style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>
                {formError}
              </div>
            )}
            <button type="button" onClick={handleAddTrip}>Додати до бюджету</button>
          </div>
        </div>

        <h3>Додати витрату</h3>
        <form id="expense-form" onSubmit={handleSubmit}>
          <select
            id="expense-category"
            value={formData.category}
            onChange={handleInputChange}
          >
            <option value="Транспорт">Транспорт</option>
            <option value="Готелі">Готелі</option>
            <option value="Їжа">Їжа</option>
            <option value="Покупки">Покупки</option>
            <option value="Різне">Різне</option>
          </select>
          <input
            type="text"
            id="expense-description"
            ref={descriptionRef}
            placeholder="Опис"
            value={formData.description}
            onChange={handleInputChange}
            style={{ borderColor: validationErrors.description ? 'red' : '' }}
          />
          {validationErrors.description && (
            <div className="validation-error" style={{ color: 'red', fontSize: '12px' }}>
              {validationErrors.description}
            </div>
          )}
          <input
            type="number"
            id="expense-quantity"
            ref={quantityRef}
            placeholder="Кількість"
            min="1"
            value={formData.quantity}
            onChange={handleInputChange}
            style={{ borderColor: validationErrors.quantity ? 'red' : '' }}
          />
          {validationErrors.quantity && (
            <div className="validation-error" style={{ color: 'red', fontSize: '12px' }}>
              {validationErrors.quantity}
            </div>
          )}
          <input
            type="number"
            id="expense-price"
            ref={priceRef}
            placeholder="Ціна за одиницю"
            min="0"
            value={formData.price}
            onChange={handleInputChange}
            style={{ borderColor: validationErrors.price ? 'red' : '' }}
          />
          {validationErrors.price && (
            <div className="validation-error" style={{ color: 'red', fontSize: '12px' }}>
              {validationErrors.price}
            </div>
          )}
          {formError && (
            <div className="form-error" style={{ color: 'red', fontSize: '12px', marginBottom: '5px' }}>
              {formError}
            </div>
          )}
          <button type="submit">Додати</button>
        </form>

        <h3>Витрати</h3>
        <table className="expense-table">
          <thead>
            <tr>
              <th>Категорія</th>
              <th>Опис</th>
              <th>Кількість</th>
              <th>Вартість</th>
              <th>Загалом</th>
              <th>Дії</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(expense => (
              <tr key={expense.id}>
                <td>{expense.category}</td>
                <td>{expense.description}</td>
                <td>{expense.quantity}</td>
                <td>{expense.price.toFixed(2)} ₴</td>
                <td>{expense.total.toFixed(2)} ₴</td>
                <td>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="delete-btn"
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4"><strong>Загалом</strong></td>
              <td><input type="number" value={totalExpenses.toFixed(2)} placeholder="₴0.00" readOnly /></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

export default Budget;