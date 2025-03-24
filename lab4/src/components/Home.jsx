import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h2>Плануйте подорожі своєї мрії</h2>
            <p>Відкрийте світ можливостей з нашим зручним планувальником подорожей. Складайте маршрути,
              досліджуйте нові місця та контролюйте свій бюджет — все в одному місці.</p>
            <div className="hero-buttons">
              <Link to="/mytrips" className="btn btn-primary">Розпочати планування</Link>
              <a href="#features" className="btn btn-secondary">Дізнатись більше</a>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section">
        <div className="container">
          <h2>Особливості планувальника</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📘</div>
              <h3>Мої подорожі</h3>
              <p>Зберігайте список запланованих та завершених подорожей. Додавайте дати, місця, фотографії та
                іншу важливу інформацію.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Місця для відвідування</h3>
              <p>Досліджуйте популярні туристичні напрямки. Переглядайте описи, ціни та відгуки, щоб обрати
                найкращі варіанти.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Контроль бюджету</h3>
              <p>Створюйте детальний план витрат на подорож, включаючи транспорт, проживання, харчування та
                інші витрати.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section popular-destinations">
        <div className="container">
          <h2>Популярні напрямки</h2>
          <div className="trips-list">
            <div className="trip-card">
              <img src="/images/paris.jpg" alt="Париж, Франція" />
              <div className="trip-info">
                <div className="trip-header">
                  <h3>Париж</h3>
                  <span className="trip-status">Популярне</span>
                </div>
                <div className="trip-country">Франція</div>
                <p className="trip-description">Місто кохання з величною Ейфелевою вежею, Лувром та чарівними
                  вуличками.</p>
                <p>⭐⭐⭐⭐⭐</p>
              </div>
            </div>
            <div className="trip-card">
              <img src="/images/dubai.jpg" alt="Дубай, ОАЕ" />
              <div className="trip-info">
                <div className="trip-header">
                  <h3>Дубай</h3>
                  <span className="trip-status">Популярне</span>
                </div>
                <div className="trip-country">ОАЕ</div>
                <p className="trip-description">Сучасні хмарочоси, розкішні пляжі Перської затоки та
                  неперевершена атмосфера східної гостинності.</p>
                <p>⭐⭐⭐⭐⭐</p>
              </div>
            </div>
            <div className="trip-card">
              <img src="/images/rome.jpg" alt="Рим, Італія" />
              <div className="trip-info">
                <div className="trip-header">
                  <h3>Рим</h3>
                  <span className="trip-status">Популярне</span>
                </div>
                <div className="trip-country">Італія</div>
                <p className="trip-description">Вічне місто з Колізеєм, Римським форумом і неперевершеною
                  італійською атмосферою.</p>
                <p>⭐⭐⭐⭐⭐</p>
              </div>
            </div>
            <div className="trip-card">
              <img src="/images/london.jpg" alt="Лондон, Англія" />
              <div className="trip-info">
                <div className="trip-header">
                  <h3>Лондон</h3>
                  <span className="trip-status">Популярне</span>
                </div>
                <div className="trip-country">Англія</div>
                <p className="trip-description">Столиця Англії, відома своїми історичними пам'ятками, музеями та культурними подіями.</p>
                <p>⭐⭐⭐⭐⭐</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-section">
        <div className="container">
          <h2>Готові розпочати планування?</h2>
          <p style={{ marginTop: '20px' }}>Не гайте часу — створіть свою першу подорож прямо зараз!</p>
          <Link
            to="/countries"
            className="btn btn-primary btn-large"
            style={{ marginTop: '30px' }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Створити подорож
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;