import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Паролі не співпадають');
      return;
    }
    
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/mytrips');
    } catch (error) {
      setError('Помилка реєстрації: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Реєстрація</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Пароль:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Підтвердження пароля:</label>
            <input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Зареєструватися</button>
        </form>
        <p>
          Вже маєте обліковий запис? <Link to="/login">Увійти</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;