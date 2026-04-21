import React from 'react';

const NotificationList = () => {
  const notifications = [
    { id: 1, title: 'Distribution Alert', message: 'Next distribution scheduled for Jan 20, 2026', time: '2 hours ago', unread: true },
    { id: 2, title: 'Quota Update', message: 'Your monthly quota has been updated', time: '1 day ago', unread: true },
    { id: 3, title: 'Payment Received', message: 'Payment of ₹450 received successfully', time: '2 days ago', unread: false },
    { id: 4, title: 'New Shop Added', message: 'Ration Shop C has been added to your area', time: '3 days ago', unread: false }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Notifications</h1>
      </div>

      <div className="card">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            style={{
              padding: '1rem',
              borderBottom: '1px solid var(--border-color)',
              backgroundColor: notification.unread ? 'var(--bg-secondary)' : 'transparent'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                  {notification.title}
                  {notification.unread && (
                    <span style={{ 
                      width: '8px', 
                      height: '8px', 
                      backgroundColor: 'var(--primary-color)', 
                      borderRadius: '50%', 
                      display: 'inline-block', 
                      marginLeft: '0.5rem' 
                    }}></span>
                  )}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  {notification.message}
                </p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                  {notification.time}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { NotificationList };