import React, { useState } from 'react';
import Input from '../common/Input';

const HoldersList = () => {
  const [search, setSearch] = useState('');
  
  const holders = [
    { id: 'RC001', name: 'Ramesh Kumar', phone: '9876543210', address: 'Street 1, Area A', members: 4 },
    { id: 'RC002', name: 'Sunita Devi', phone: '9876543211', address: 'Street 2, Area B', members: 5 },
    { id: 'RC003', name: 'Mahesh Patil', phone: '9876543212', address: 'Street 3, Area A', members: 3 },
    { id: 'RC004', name: 'Anita Sharma', phone: '9876543213', address: 'Street 4, Area C', members: 6 }
  ];

  const filtered = holders.filter(h => 
    h.name.toLowerCase().includes(search.toLowerCase()) || 
    h.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Cardholders List</h1>
      </div>

      <div className="card">
        <div style={{ marginBottom: '1.5rem' }}>
          <Input
            type="text"
            placeholder="Search by name or card ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Card ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Family Members</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((holder) => (
                <tr key={holder.id}>
                  <td>{holder.id}</td>
                  <td>{holder.name}</td>
                  <td>{holder.phone}</td>
                  <td>{holder.address}</td>
                  <td>{holder.members}</td>
                  <td>
                    <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                      View Details
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

export { HoldersList };
