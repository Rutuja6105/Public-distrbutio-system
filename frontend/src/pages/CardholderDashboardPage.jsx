import React, { useState } from 'react';
import Header from '../components/common/Header';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import ComplaintSection from '../components/common/ComplaintSection';
import { Profile } from '../components/cardholder/Profile';

const CardholderDashboardPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [queueNumber, setQueueNumber] = useState(null);
  const [schedule] = useState({
    date: '2026-04-21',
    time: '10:30 AM',
    shop: 'Laxmi mahila bachat gat rast dukan'
  });

  const messages = [t('beneficiaryMsg1'), t('beneficiaryMsg2'), t('beneficiaryMsg3')];

  const takeQueueNumber = () => {
    const generated = Math.floor(Math.random() * 30) + 1;
    setQueueNumber(generated);
  };

  return (
    <div>
      <Header onProfileClick={() => setActiveTab('profile')} />
      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <a 
              href="#dashboard" 
              className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
            >
              <span className="sidebar-icon">📊</span>
              <span className="sidebar-label">{t('dashboard')}</span>
            </a>
            <a 
              href="#profile" 
              className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('profile'); }}
            >
              <span className="sidebar-icon">👤</span>
              <span className="sidebar-label">{t('profile')}</span>
            </a>
          </nav>
        </aside>

        <main className="dashboard-main">
          {activeTab === 'profile' ? (
            <Profile />
          ) : (
            <>
              <div className="page-header">
                <h1 className="page-title">{t('beneficiaryDashboardTitle')}</h1>
              </div>

              <section className="card">
                <h2>{t('yourDistributionSchedule')}</h2>
                <p><strong>{t('date')}:</strong> {schedule.date}</p>
                <p><strong>{t('time')}:</strong> {schedule.time}</p>
                <p><strong>{t('shop')}:</strong> {schedule.shop}</p>
              </section>

              <section className="card">
                <h2>{t('takeQueueNumber')}</h2>
                <button type="button" onClick={takeQueueNumber}>
                  {t('generateQueueNumber')}
                </button>
                {queueNumber ? (
                  <p className="success-message">
                    {t('yourQueueNumberIs', { number: queueNumber })}
                  </p>
                ) : (
                  <p>{t('clickToTakeQueueNumber')}</p>
                )}
              </section>

              <section className="card">
                <h2>{t('messagesFromShopOwner')}</h2>
                <ul>
                  {messages.map((message, index) => (
                    <li key={index}>{message}</li>
                  ))}
                </ul>
              </section>

              <ComplaintSection />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CardholderDashboardPage;
