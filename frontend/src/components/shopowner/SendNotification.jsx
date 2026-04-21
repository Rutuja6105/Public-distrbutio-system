import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';

const SendNotification = () => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'all'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Notification sent successfully!');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Send Notification</h1>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <div className="input-group">
            <label className="input-label">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="5"
              className="input-field"
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="input-group">
            <label className="input-label">Send To</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="select-field"
            >
              <option value="all">All Cardholders</option>
              <option value="pending">Pending Collections</option>
              <option value="specific">Specific Cards</option>
            </select>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Button type="submit">Send Notification</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { SendNotification };