import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();

  const stats = [
    { title: 'Current Balance', value: '₹2,450', icon: '💰', color: '#10b981' },
    { title: 'This Month Used', value: '₹1,550', icon: '📊', color: '#3b82f6' },
    { title: 'Available Quota', value: '25 kg', icon: '📦', color: '#f59e0b' },
    { title: 'Next Distribution', value: '5 days', icon: '📅', color: '#8b5cf6' }
  ];

  const recentTransactions = [
    { id: 1, date: '2026-01-15', shop: 'Ration Shop A', items: 'Rice 10kg, Wheat 5kg', amount: '₹450' },
    { id: 2, date: '2026-01-10', shop: 'Ration Shop B', items: 'Sugar 2kg, Oil 1L', amount: '₹280' },
    { id: 3, date: '2026-01-05', shop: 'Ration Shop A', items: 'Rice 5kg', amount: '₹225' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t('dashboard')}</h1>
      </div>

      <div className="grid grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="stats-card">
            <div className="stats-header">
              <div>
                <div className="stats-title">{stat.title}</div>
                <div className="stats-value">{stat.value}</div>
              </div>
              <div className="stats-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Recent Transactions</h2>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Shop</th>
                <th>Items</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentTransactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.date}</td>
                  <td>{transaction.shop}</td>
                  <td>{transaction.items}</td>
                  <td style={{ fontWeight: '600' }}>{transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;