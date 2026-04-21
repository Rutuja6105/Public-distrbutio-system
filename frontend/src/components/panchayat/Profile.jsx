import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '9988776655',
    village: 'Narshingpur',
    designation: 'Sarpanch'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(t('profileUpdatedSuccess') || 'Profile updated successfully!');
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t('profile')}</h1>
      </div>

      <div className="card">
        <div className="profile-header-main">
          <div className="profile-avatar-container">
            <img 
              src={`https://ui-avatars.com/api/?name=${user?.name || 'User'}&size=128&background=random&color=fff`} 
              alt="Profile" 
              className="profile-main-avatar"
            />
            <button className="avatar-edit-btn">✏️</button>
          </div>
          <div className="profile-info-summary">
            <h2>{user?.name}</h2>
            <p className="profile-role-badge">{t(`${user?.role}Role`) || user?.role}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2" style={{ gap: '1rem' }}>
            <label>
              {t('fullName')}
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              {t('email')}
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>
            <label>
              {t('phoneNumber')}
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </label>
            <label>
              {t('villageNameLabel')}
              <input
                name="village"
                value={formData.village}
                onChange={handleChange}
                disabled
              />
            </label>
          </div>

          <label style={{ marginTop: '1rem' }}>
            {t('role')}
            <input
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              disabled
            />
          </label>

          <div style={{ marginTop: '1.5rem' }}>
            <button type="submit" className="action-button primary-action">
              {t('Update Profile') || 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
