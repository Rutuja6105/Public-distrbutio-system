import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();
  const { t } = useLanguage();
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '9876543210',
    shopName: user?.shopName || 'Laxmi Mahila Bachat Gat rast dukan',
    address: user?.address || 'Narshingpur Ward 1'
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
      alert(t('profileUpdatedSuccess') || 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile.');
    }
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
              {t('shopName')}
              <input
                name="shopName"
                value={formData.shopName}
                onChange={handleChange}
                disabled
              />
            </label>
          </div>

          <label style={{ marginTop: '1rem' }}>
            {t('address')}
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </label>

          <div style={{ marginTop: '1.5rem' }}>
            <button type="submit" className="action-button primary-action">
              {t('updateProfile') || 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
