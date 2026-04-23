import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { api } from '../../services/api';

const SendNotification = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'all',
    mobileNumber: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/notifications', {
        title: formData.title,
        message: formData.message,
        type: formData.type,
        mobileNumber: formData.type === 'specific' ? formData.mobileNumber : undefined
      });
      
      console.log('API Response:', response);
      alert(response.message || 'Notification sent successfully!');
      
      // Reset form if successful
      if (formData.type === 'specific') {
        setFormData({ ...formData, mobileNumber: '' });
      }
    } catch (error) {
      console.error('Failed to send notification:', error);
      alert('Failed to send notification. Please try again.');
    } finally {
      setLoading(false);
    }
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
              <option value="specific">Specific Mobile Number</option>
            </select>
          </div>

          {formData.type === 'specific' && (
            <Input
              label="Mobile Number"
              name="mobileNumber"
              type="tel"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter 10-digit mobile number"
              required
            />
          )}

          <div style={{ marginTop: '1.5rem' }}>
            <Button type="submit" loading={loading}>Send Notification</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { SendNotification };