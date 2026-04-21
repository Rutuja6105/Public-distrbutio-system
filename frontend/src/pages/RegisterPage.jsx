import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLanguage } from '../hooks/useLanguage';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import LanguageSelector from '../components/common/LanguageSelector';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
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
      setError(t('passwordsDoNotMatch'));
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
      setError(t('registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <h1>{t('appName')}</h1>
          <p>{t('beneficiaryRegistration')}</p>
        </div>
        
        <LanguageSelector />
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <Input
            type="text"
            name="name"
            label={t('fullName')}
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
            label={t('phoneNumber')}
            value={formData.phone}
            onChange={handleChange}
            required
          />
          
          <Input
            type="text"
            name="address"
            label={t('address')}
            value={formData.address}
            onChange={handleChange}
            required
          />

          <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {t('noteManagedAccounts')}
          </p>
          
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
            label={t('confirmPassword')}
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
            {t('alreadyHaveAccount')}{' '}
            <Link to="/login">{t('login')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
