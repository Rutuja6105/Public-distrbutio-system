import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Input from '../common/Input';
import Button from '../common/Button';
import Select from '../common/Select';
import LanguageSelector from '../common/LanguageSelector';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    role: 'cardholder',
    address: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const user = await register(formData);
      
      const dashboardMap = {
        cardholder: '/cardholder-dashboard',
        shopowner: '/shop-owner-dashboard',
        panchayat: '/panchayat-dashboard'
      };
      
      navigate(dashboardMap[user.role]);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <h1>PDS System</h1>
          <p>Create your account</p>
        </div>
        
        <LanguageSelector />
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <Input
            type="text"
            name="name"
            label="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          
          <Input
            type="email"
            name="email"
            label={t('email')}
            value={formData.email}
            onChange={handleChange}
            required
          />
          
          <Input
            type="tel"
            name="phone"
            label="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          
          <Select
            name="role"
            label="Role"
            value={formData.role}
            onChange={handleChange}
            options={[
              { value: 'cardholder', label: 'Cardholder' },
              { value: 'shopowner', label: 'Shop Owner' },
              { value: 'panchayat', label: 'Panchayat' }
            ]}
            required
          />
          
          <Input
            type="text"
            name="address"
            label="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
          
          <Input
            type="password"
            name="password"
            label={t('password')}
            value={formData.password}
            onChange={handleChange}
            required
          />
          
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          
          <Button type="submit" loading={loading} fullWidth>
            {t('register')}
          </Button>
        </form>
        
        <div className="auth-footer">
          <p>
            Already have an account?{' '}
            <Link to="/login">{t('login')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;