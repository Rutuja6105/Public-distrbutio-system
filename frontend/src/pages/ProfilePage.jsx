import React, { useState } from 'react';
import Header from '../components/common/Header';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { User, Package, Settings, CreditCard, ChevronRight, LogOut } from 'lucide-react';
import '../styles/profile.css';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('personal');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    gender: 'male',
    email: user?.email || '',
    phone: user?.phone || '9876543210'
  });

  const menuSections = [
    {
      title: 'Account Settings',
      icon: <User className="w-5 h-5" />,
      items: [
        { id: 'personal', label: 'Profile Information' },
        { id: 'addresses', label: 'Manage Addresses' },
        { id: 'pan', label: 'PAN Card Information' }
      ]
    },
    {
      title: 'Payments',
      icon: <CreditCard className="w-5 h-5" />,
      items: [
        { id: 'gift_cards', label: 'Gift Cards' },
        { id: 'saved_cards', label: 'Saved Cards' },
        { id: 'upi', label: 'UPI' }
      ]
    },
    {
      title: 'My Stuff',
      icon: <Package className="w-5 h-5" />,
      items: [
        { id: 'coupons', label: 'My Coupons' },
        { id: 'reviews', label: 'My Reviews' },
        { id: 'wishlist', label: 'Wishlist' }
      ]
    }
  ];

  const handleUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    alert('Profile updated significantly!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="profile-container">
        {/* Sidebar */}
        <div className="profile-sidebar">
          <div className="user-snippet">
            <div className="avatar-circle">
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-gray-500">Hello,</p>
              <h3 className="font-bold">{user?.name}</h3>
            </div>
          </div>

          <div className="sidebar-menu">
            {menuSections.map((section, idx) => (
              <div key={idx} className="menu-section">
                <div className="menu-header">
                  <div className="text-blue-600">{section.icon}</div>
                  {section.title}
                </div>
                <ul className="menu-items">
                  {section.items.map((item) => (
                    <li
                      key={item.id}
                      className={`menu-item ${activeSection === item.id ? 'active' : ''}`}
                      onClick={() => setActiveSection(item.id)}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div className="menu-section">
              <div 
                className="menu-header cursor-pointer hover:text-blue-600" 
                onClick={logout}
                style={{ cursor: 'pointer' }}
              >
                <LogOut className="w-5 h-5 text-blue-600" />
                Logout
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="profile-content">
          <div className="content-header">
            <h2 className="text-lg font-bold">Personal Information</h2>
            {!isEditing && (
              <span className="edit-link" onClick={() => setIsEditing(true)}>Edit</span>
            )}
          </div>

          <form onSubmit={handleUpdate}>
            <div className="info-grid">
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  className={`border p-2 rounded ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  disabled={!isEditing}
                  placeholder="First Name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  className={`border p-2 rounded ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  disabled={!isEditing}
                  placeholder="Last Name"
                />
              </div>
            </div>

            {isEditing && (
              <button type="submit" className="save-btn mb-8">SAVE</button>
            )}

            <div className="info-section mb-12">
              <h3 className="text-lg font-semibold">Your Gender</h3>
              <div className="gender-selection">
                <label className="radio-group">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    disabled={!isEditing}
                  />
                  <span>Male</span>
                </label>
                <label className="radio-group">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    disabled={!isEditing}
                  />
                  <span>Female</span>
                </label>
              </div>
            </div>

            <div className="info-section mb-12">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold m-0">Email Address</h3>
                {!isEditing && <span className="edit-link" onClick={() => setIsEditing(true)}>Edit</span>}
              </div>
              <input
                type="email"
                className={`border p-2 rounded w-1/2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                value={formData.email}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="info-section">
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-lg font-semibold m-0">Mobile Number</h3>
                {!isEditing && <span className="edit-link" onClick={() => setIsEditing(true)}>Edit</span>}
              </div>
              <input
                type="tel"
                className={`border p-2 rounded w-1/2 ${!isEditing ? 'bg-gray-50' : 'bg-white'}`}
                value={formData.phone}
                disabled={!isEditing}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </form>

          <section className="mt-12 pt-8 border-t">
            <h3 className="text-blue-600 font-bold mb-4">FAQs</h3>
            <p className="font-bold text-sm mb-2">What happens when I update my email address (or mobile number)?</p>
            <p className="text-sm text-gray-600 mb-4">Your login email id (or mobile number) changes, likewise. You'll receive all your future account communications on your updated email id (or mobile number).</p>
            
            <p className="font-bold text-sm mb-2">When will my Flipkart account be updated with the new email address (or mobile number)?</p>
            <p className="text-sm text-gray-600 mb-4">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
