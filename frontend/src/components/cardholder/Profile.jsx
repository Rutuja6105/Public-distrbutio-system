import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Input from '../common/Input';
import Button from '../common/Button';

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '9876543210',
    address: '123 Main Street, City',
    rationCardNumber: 'RC123456789',
    familyMembers: '4'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Profile</h1>
      </div>

      <div className="card">
        <div className="profile-header-main">
          <div className="profile-avatar-container">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&size=128&background=random&color=fff`} 
              alt="Profile" 
              className="profile-main-avatar"
            />
            <button className="avatar-edit-btn" type="button">✏️</button>
          </div>
          <div className="profile-info-summary">
            <h2>{user?.name}</h2>
            <p className="profile-role-badge">{t(`${user?.role}Role`) || user?.role}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <Input
              label="Full Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <Input
              label="Ration Card Number"
              name="rationCardNumber"
              value={formData.rationCardNumber}
              onChange={handleChange}
              disabled
            />
            <Input
              label="Family Members"
              type="number"
              name="familyMembers"
              value={formData.familyMembers}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />

          <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
            <Button type="submit">Update Profile</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { Profile };