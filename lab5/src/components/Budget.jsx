import React, { useState, useEffect, useRef } from 'react';
import { db } from '../utils/firebase';
import { collection, doc, setDoc, getDoc, onSnapshot, query, where } from 'firebase/firestore';
import { useAuth } from '../utils/AuthContext';

function Budget() {
  const { currentUser, isAuthenticated } = useAuth();
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
    fetchDestinationPrices();

    if (isAuthenticated && currentUser) {
      loadUserBudgetData();
    }
  }, [currentUser, isAuthenticated]);

  useEffect(() => {
    if ((expenses.length > 0 || budget) && isAuthenticated && currentUser) {
      saveToFirestore();
      calculateTotal();
    }
  }, [expenses, budget]);

  useEffect(() => {
    updateTripCost();
  }, [tripData.destination, tripData.duration, destinationPrices]);

  const fetchDestinationPrices = () => {
    const mockPrices = {
      'Львів': 650,
      'Київ': 750,
      'Одеса': 600,
      'Карпати': 700,
      'Харків': 800,
      'Івано-Франківськ': 1000,
      'Чернігів': 950,
      'Ужгород': 1050,
      'Ліверпуль': 1100,
      'Лондон': 1500,
      'Манчестер': 1200,
      'Марсель': 1600,
      'Ліон': 1500,
      'Ніцца': 1800,
      'Париж': 2000,
      'Венеція': 1800,
      'Флоренція': 1700,
      'Рим': 2200,
      'Мілан': 2200,
      'Фуджейра': 2200,
      'Шарджа': 2000,
      'Абу-Дабі': 2400,
      'Дубай': 2500
    };
    setDestinationPrices(mockPrices);
  };

  const loadUserBudgetData = async () => {
    try {
      const userBudgetRef = doc(db, 'userBudgets', currentUser.uid);
      const docSnap = await getDoc(userBudgetRef);

      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.budget) {
          setBudget(userData.budget);
        }
        if (userData.expenses) {
          setExpenses(userData.expenses);
          calculateTotal(userData.expenses);
        }
      }
    } catch (error) {
      console.error("Error loading budget data: ", error);
    }
  };

  const calculateTotal = (expenseList = expenses) => {
    const total = expenseList.reduce((sum, expense) => sum + expense.total, 0);
    setTotalExpenses(total);

    const budgetValue = parseFloat(budget) || 0;
    setRemainingBudget(budgetValue - total);
  };

  const saveToFirestore = async () => {
    if (!currentUser) return;

    try {
      const userBudgetRef = doc(db, 'userBudgets', currentUser.uid);
      await setDoc(userBudgetRef, {
        budget: budget,
        expenses: expenses,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error("Error saving budget data: ", error);
    }
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

    setExpenses(prevExpenses => [...prevExpenses, newExpense]);

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

    setExpenses(prevExpenses => [...prevExpenses, newExpense]);

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

  if (!isAuthenticated) {
    return (
      <section className="budget-section">
        <div className="container">
          <h2>Бюджет</h2>
          <p>Будь ласка, увійдіть в систему, щоб керувати своїм бюджетом.</p>
        </div>
      </section>
    );
  }

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
              <label htmlFor="trip-destination">Місце призначення:</label>
              <select
                id="trip-destination"
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
              <label htmlFor="trip-duration">Тривалість (днів):</label>
              <input
                type="number"
                id="trip-duration"
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
              <label htmlFor="trip-tripCost">Вартість подорожі:</label>
              <input
                type="number"
                id="trip-tripCost"
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
              <td><strong>{totalExpenses.toFixed(2)} ₴</strong></td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

export default Budget;