// PanchayatDashboardPage.jsx
import React, { useState } from 'react';
import Header from '../components/common/Header';
import { useLanguage } from '../context/LanguageContext';
import '../styles/dashboard.css';

const PanchayatDashboard = () => {
  const stats = [
    { title: t('totalShops'), value: '12', icon: '🏪', color: '#10b981' },
    { title: t('totalCardholders'), value: '1,248', icon: '👥', color: '#3b82f6' },
    { title: t('activeDistributions'), value: '156', icon: '📦', color: '#f59e0b' },
    { title: t('completionRate'), value: '92%', icon: '✅', color: '#8b5cf6' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t('panchayatDashboard')}</h1>
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

      <div className="grid grid-cols-2" style={{ marginTop: '2rem' }}>
        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t('shopPerformance')}</h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>{t('shopName')}</th>
                  <th>{t('cardholders')}</th>
                  <th>{t('distribution')}</th>
                  <th>{t('status')}</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Shop A', holders: 248, distributed: 232, status: 'good' },
                  { name: 'Shop B', holders: 195, distributed: 188, status: 'good' },
                  { name: 'Shop C', holders: 312, distributed: 275, status: 'warning' },
                  { name: 'Shop D', holders: 186, distributed: 180, status: 'good' }
                ].map((shop, index) => (
                  <tr key={index}>
                    <td>{shop.name}</td>
                    <td>{shop.holders}</td>
                    <td>{shop.distributed}</td>
                    <td>
                      <span className={`badge ${shop.status === 'good' ? 'badge-success' : 'badge-warning'}`}>
                        {shop.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t('recentActivities')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { activity: 'Distribution completed at Shop A', time: '2 hours ago' },
              { activity: 'New cardholder registered', time: '5 hours ago' },
              { activity: 'Stock request from Shop C', time: '1 day ago' },
              { activity: 'Monthly report generated', time: '2 days ago' }
            ].map((item, index) => (
              <div key={index} style={{ borderBottom: index < 3 ? '1px solid var(--border-color)' : 'none', paddingBottom: '1rem' }}>
                <div style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.25rem' }}>{item.activity}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>{item.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Analytics = () => {
  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t('analytics')}</h1>
      </div>

      <div className="grid grid-cols-3">
        {[
          { title: t('efficiency'), value: '87%', change: '+5%', positive: true },
          { title: t('avgWaitTime'), value: '12 min', change: '-3 min', positive: true },
          { title: t('stockUtilization'), value: '94%', change: '+2%', positive: true }
        ].map((metric, index) => (
          <div key={index} className="stats-card">
            <div className="stats-title">{metric.title}</div>
            <div className="stats-value">{metric.value}</div>
            <div className={`stats-change ${metric.positive ? 'positive' : 'negative'}`}>
              {metric.positive ? '↑' : '↓'} {metric.change}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>{t('monthlyTrends')}</h2>
        <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>Chart visualization would go here</p>
        </div>
      </div>
    </div>
  );
};

const Reports = () => {
  const reports = [
    { title: 'Monthly Distribution Report', date: '2026-01-01', type: 'PDF', size: '2.4 MB' },
    { title: 'Shop Performance Report', date: '2026-01-01', type: 'PDF', size: '1.8 MB' },
    { title: 'Cardholder Statistics', date: '2025-12-01', type: 'Excel', size: '856 KB' },
    { title: 'Stock Inventory Report', date: '2025-12-15', type: 'PDF', size: '1.2 MB' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t('reports')}</h1>
        <button className="btn btn-primary">{t('generateReport')}</button>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{t('reportTitle')}</th>
                <th>{t('date')}</th>
                <th>{t('status')}</th>
                <th>{t('size') || 'Size'}</th>
                <th>{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index}>
                  <td>{report.title}</td>
                  <td>{report.date}</td>
                  <td>
                    <span className="badge badge-info">{report.type}</span>
                  </td>
                  <td>{report.size}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                      {t('download')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const ShopManagement = () => {
  const shops = [
    { id: 1, name: 'Ration Shop A', owner: 'Rajesh Kumar', area: 'Area A', cardholders: 248, status: 'active' },
    { id: 2, name: 'Ration Shop B', owner: 'Suresh Patil', area: 'Area B', cardholders: 195, status: 'active' },
    { id: 3, name: 'Ration Shop C', owner: 'Meena Devi', area: 'Area C', cardholders: 312, status: 'active' },
    { id: 4, name: 'Ration Shop D', owner: 'Amit Sharma', area: 'Area D', cardholders: 186, status: 'inactive' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t('shopManagement')}</h1>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>{t('shopName')}</th>
                <th>{t('ownerName')}</th>
                <th>{t('area')}</th>
                <th>{t('cardholders')}</th>
                <th>{t('status')}</th>
                <th>{t('action')}</th>
              </tr>
            </thead>
            <tbody>
              {shops.map((shop) => (
                <tr key={shop.id}>
                  <td>{shop.name}</td>
                  <td>{shop.owner}</td>
                  <td>{shop.area}</td>
                  <td>{shop.cardholders}</td>
                  <td>
                    <span className={`badge ${shop.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                      {shop.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                        {t('markResolved') || 'Edit'}
                      </button>
                      <button className="btn btn-danger" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                        {t('logout') || 'Delete'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const PanchayatDashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { t } = useLanguage();

  const menuItems = [
    { id: 'dashboard', label: t('dashboard'), icon: '📊' },
    { id: 'analytics', label: t('analytics'), icon: '📈' },
    { id: 'reports', label: t('reports'), icon: '📄' },
    { id: 'shops', label: t('shopManagement'), icon: '🏪' }
  ];

  return (
    <div>
      <Header />
      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                }}
                className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
              >
                <span className="sidebar-icon">{item.icon}</span>
                <span className="sidebar-label">{item.label}</span>
              </a>
            ))}
          </nav>
        </aside>

        <main className="dashboard-main">
          {activeTab === 'dashboard' && <PanchayatDashboard />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'shops' && <ShopManagement />}
        </main>
      </div>
    </div>
  );
};

export default PanchayatDashboardPage;