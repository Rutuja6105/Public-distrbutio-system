import React from 'react';

const DistributionStatus = () => {
  const distributions = [
    { id: 'RC001', name: 'Ramesh Kumar', items: 'Rice 10kg, Wheat 5kg', status: 'completed', date: '2026-01-17' },
    { id: 'RC002', name: 'Sunita Devi', items: 'Sugar 2kg, Oil 1L', status: 'completed', date: '2026-01-17' },
    { id: 'RC003', name: 'Mahesh Patil', items: 'Rice 5kg', status: 'pending', date: '2026-01-17' },
    { id: 'RC004', name: 'Anita Sharma', items: 'Wheat 10kg, Dal 2kg', status: 'pending', date: '2026-01-17' }
  ];

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Distribution Status</h1>
      </div>

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Card ID</th>
                <th>Cardholder Name</th>
                <th>Items</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {distributions.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.items}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className={`badge ${item.status === 'completed' ? 'badge-success' : 'badge-warning'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td>
                    {item.status === 'pending' && (
                      <button className="btn btn-primary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                        Mark Complete
                      </button>
                    )}
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

export { DistributionStatus };
