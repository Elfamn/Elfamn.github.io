import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';

function Header() {
    const { currentUser, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Помилка виходу', error);
        }
    };

    return (
        <header>
            <div className="logo-wrapper">
                <Link to="/" className="logo-link">
                    <img src="./images/travel-logo.svg" alt="Планування подорожей" className="logo" />
                    <h1>Планування подорожей</h1>
                </Link>
            </div>
            <nav className="main-navigation">
                <ul>
                    <li>
                        <NavLink to="/mytrips"
                            className={({ isActive }) => isActive ? 'active' : ''}>
                            Мої подорожі
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/countries"
                            className={({ isActive }) => isActive ? 'active' : ''}>
                            Місця для відвідування
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/budget"
                            className={({ isActive }) => isActive ? 'active' : ''}>
                            Бюджет
                        </NavLink>
                    </li>
                </ul>
            </nav>

            <div className="auth-buttons">
                {isAuthenticated ? (
                    <>
                        <span className="user-email">{currentUser.email}</span>
                        <button className="btn btn-secondary" onClick={handleLogout}>Вийти</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="btn btn-secondary">Увійти</Link>
                        <Link to="/register" className="btn btn-primary">Реєстрація</Link>
                    </>
                )}
            </div>

        </header>
    );
}

export default Header;