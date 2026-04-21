import React from 'react';

const ShopDashboard = () => {
  const stats = [
    { title: 'Total Cardholders', value: '248', icon: '👥', color: '#10b981' },
    { title: 'Today\'s Distribution', value: '42', icon: '📦', color: '#3b82f6' },
    { title: 'Pending Collections', value: '18', icon: '⏳', color: '#f59e0b' },
    { title: 'Stock Available', value: '85%', icon: '📊', color: '#8b5cf6' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Shop Dashboard</h1>
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
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Quick Actions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button className="btn btn-primary" style={{ justifyContent: 'flex-start' }}>
              📦 Mark Collection
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              🔔 Send Notification
            </button>
            <button className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              📊 View Reports
            </button>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>Stock Status</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { item: 'Rice', quantity: '450 kg', status: 'good' },
              { item: 'Wheat', quantity: '280 kg', status: 'good' },
              { item: 'Sugar', quantity: '45 kg', status: 'low' },
              { item: 'Oil', quantity: '120 L', status: 'good' }
            ].map((stock, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '500' }}>{stock.item}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{stock.quantity}</span>
                  <span className={`badge ${stock.status === 'good' ? 'badge-success' : 'badge-warning'}`}>
                    {stock.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopDashboard;