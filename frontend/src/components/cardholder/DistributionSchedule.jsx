import React from 'react';

const DistributionSchedule = () => {
  const schedule = [
    { date: '2026-01-20', time: '10:00 AM - 2:00 PM', shop: 'Ration Shop A', items: 'Rice, Wheat, Sugar', status: 'upcoming' },
    { date: '2026-01-25', time: '11:00 AM - 3:00 PM', shop: 'Ration Shop B', items: 'Oil, Dal', status: 'upcoming' },
    { date: '2026-01-15', time: '10:00 AM - 2:00 PM', shop: 'Ration Shop A', items: 'Rice, Wheat', status: 'completed' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Distribution Schedule</h1>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Shop</th>
                <th>Items</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.shop}</td>
                  <td>{item.items}</td>
                  <td>
                    <span className={`badge ${item.status === 'upcoming' ? 'badge-warning' : 'badge-success'}`}>
                      {item.status}
                    </span>
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

export { DistributionSchedule };