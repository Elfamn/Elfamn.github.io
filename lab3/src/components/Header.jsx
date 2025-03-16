import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Header() {
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
        </header>
    );
}

export default Header;