import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Input from '../common/Input';
import Button from '../common/Button';
import LanguageSelector from '../common/LanguageSelector';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await login(email, password);
      
      // Redirect based on role
      const dashboardMap = {
        cardholder: '/cardholder-dashboard',
        shopowner: '/shop-owner-dashboard',
        panchayat: '/panchayat-dashboard'
      };
      
      navigate(dashboardMap[user.role]);
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h1>PDS System</h1>
          <p>{t('welcome')}</p>
        </div>
        
        <LanguageSelector />
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <Input
            type="email"
            label={t('email')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input
            type="password"
            label={t('password')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>
          
          <Button type="submit" loading={loading} fullWidth>
            {t('login')}
          </Button>
        </form>
        
        <div className="auth-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/register">{t('register')}</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;