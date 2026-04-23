import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const HoldersList = () => {
  const [search, setSearch] = useState('');
  const [selectedHolder, setSelectedHolder] = useState(null);
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
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

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log(`Sending message to ${selectedHolder.phone}: ${message}`);
      alert(`Message successfully sent to ${selectedHolder.name} (${selectedHolder.phone})`);
      setIsSending(false);
      setSelectedHolder(null);
      setMessage('');
    }, 1000);
  };

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
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-secondary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}>
                        View
                      </button>
                      <button 
                        className="btn btn-primary" 
                        style={{ padding: '0.375rem 0.75rem', fontSize: '0.75rem' }}
                        onClick={() => setSelectedHolder(holder)}
                      >
                        Message
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Message Modal */}
      {selectedHolder && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3 className="modal-title">Send Message to {selectedHolder.name}</h3>
              <button className="modal-close" onClick={() => setSelectedHolder(null)}>&times;</button>
            </div>
            <form onSubmit={handleSendMessage}>
              <div className="modal-body">
                <div style={{ marginBottom: '1rem' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                    Recipient: <strong>{selectedHolder.phone}</strong>
                  </p>
                </div>
                <div className="input-group">
                  <label className="input-label">Message Content</label>
                  <textarea
                    className="input-field"
                    rows="4"
                    placeholder="Type your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    style={{ resize: 'vertical' }}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <Button 
                  type="button" 
                  variant="secondary" 
                  onClick={() => setSelectedHolder(null)}
                  disabled={isSending}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  variant="primary"
                  disabled={isSending || !message.trim()}
                >
                  {isSending ? 'Sending...' : 'Send SMS'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export { HoldersList };
