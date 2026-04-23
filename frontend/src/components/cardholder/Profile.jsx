import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Input from '../common/Input';
import Button from '../common/Button';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '9876543210',
    address: user?.address || '123 Main Street, City',
    rationCardNumber: user?.rationCardNumber || 'RC123456789',
    familyMembers: user?.familyMembers || '4'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          await updateUserProfile({ profileImage: reader.result });
          alert('Profile image updated successfully!');
        } catch (error) {
          console.error('Error updating profile image:', error);
          alert('Failed to update profile image.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
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
              src={user?.profileImage || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&size=128&background=3b82f6&color=fff`} 
              alt="Profile" 
              className="profile-main-avatar"
              onError={(e) => {
                e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y&s=128';
              }}
            />
            <button 
              className="avatar-edit-btn" 
              type="button"
              onClick={handleImageClick}
            >
              ✏️
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*"
              onChange={handleImageChange}
            />
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