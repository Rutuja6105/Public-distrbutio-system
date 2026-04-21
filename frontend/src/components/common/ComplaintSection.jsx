import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { complaintService } from '../../services/complaintService';

const ComplaintSection = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({
    subject: '',
    description: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const data = await complaintService.getComplaints();
      // Filter complaints by current user if they are not admin/panchayat
      const userComplaints = data.filter(c => c.userId === user?.id);
      setComplaints(userComplaints);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (!formData.subject || !formData.description) {
      setError(t('validationRequiredField', { field: t('complaintSubject') + '/' + t('complaintDescription') }));
      return;
    }

    try {
      await complaintService.submitComplaint({
        ...formData,
        userId: user?.id,
        userName: user?.name,
        userEmail: user?.email,
        role: user?.role
      });
      setMessage(t('complaintSubmittedSuccess'));
      setFormData({ subject: '', description: '' });
      loadComplaints();
    } catch (err) {
      setError(t('complaintFetchFailed'));
      console.error(err);
    }
  };

  return (
    <section className="card">
      <h2>{t('complaintSectionTitle')}</h2>

      <form onSubmit={handleSubmit} className="complaint-form">
        <div className="grid grid-cols-1">
          <label>
            {t('complaintSubject')}
            <select
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            >
              <option value="">{t('selectSubject')}</option>
              <option value="ration_delay">{t('subject_ration_delay')}</option>
              <option value="shop_closed">{t('subject_shop_closed')}</option>
              <option value="quality_issue">{t('subject_quality_issue')}</option>
              <option value="behavior_issue">{t('subject_behavior_issue')}</option>
              <option value="other">{t('subject_other')}</option>
            </select>
          </label>

          <label>
            {t('complaintDescription')}
            <textarea
              rows="4"
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #0f172a', marginTop: '0.5rem' }}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </label>
        </div>

        <div className="form-actions" style={{ marginTop: '1rem' }}>
          <button type="submit" className="action-button primary-action">
            {t('submitComplaint')}
          </button>
        </div>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>

      {complaints.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>{t('yourComplaints')}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {complaints.map((c) => (
              <li key={c.id} className="family-member-panel" style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong>{t(`subject_${c.subject}`)}</strong>
                  <span className={`status-badge status-${c.status}`}>
                    {t(`state_${c.status}`)}
                  </span>
                </div>
                <p style={{ margin: '0.5rem 0', fontSize: '0.9rem' }}>{c.description}</p>
                <small style={{ color: '#666' }}>
                  {new Date(c.createdAt).toLocaleDateString()} {new Date(c.createdAt).toLocaleTimeString()}
                </small>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
};

export default ComplaintSection;
