import React, { useMemo, useState } from 'react';
import Header from '../components/common/Header';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import Profile from '../components/panchayat/Profile';

const VILLAGE_NAME = 'Narshingpur';
const defaultFirebaseConfig = {
  databaseUrl: '',
  path: 'pds/narshingpur/beneficiaries',
  authToken: ''
};

const overviewData = [
  { name: 'Collected', value: 450, color: '#10b981' },
  { name: 'Pending', value: 120, color: '#f59e0b' },
  { name: 'Not Collected', value: 30, color: '#ef4444' },
];

const wardData = [
  { name: 'Ward 1', count: 125 },
  { name: 'Ward 2', count: 98 },
  { name: 'Ward 3', count: 142 },
  { name: 'Ward 4', count: 85 },
  { name: 'Ward 5', count: 110 },
];

const PanchayatDashboardPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [complaints, setComplaints] = useState([
    { id: 1, textKey: 'complaint_queue_delay', state: 'open' },
    { id: 2, textKey: 'complaint_marking_error', state: 'open' }
  ]);
  const [beneficiaries] = useState([
    { id: 1, headName: 'Ravi Kumar', rationCardNo: 'RC-1021', address: `${VILLAGE_NAME} Ward 1`, totalMembers: 4, cardType: 'orange' },
    { id: 2, headName: 'Sita Devi', rationCardNo: 'RC-1022', address: `${VILLAGE_NAME} Ward 2`, totalMembers: 5, cardType: 'white' },
    { id: 3, headName: 'Imran Ali', rationCardNo: 'RC-1023', address: `${VILLAGE_NAME} Ward 3`, totalMembers: 3, cardType: 'yellow' }
  ]);
  const [firebaseConfig, setFirebaseConfig] = useState(() => {
    try {
      const storedConfig = localStorage.getItem('firebaseConfig');
      return storedConfig ? { ...defaultFirebaseConfig, ...JSON.parse(storedConfig) } : defaultFirebaseConfig;
    } catch {
      return defaultFirebaseConfig;
    }
  });
  const [firebaseErrors, setFirebaseErrors] = useState({});
  const [firebaseMessage, setFirebaseMessage] = useState('');
  const [firebaseLoading, setFirebaseLoading] = useState(false);

  const activeComplaints = useMemo(
    () => complaints.filter((item) => item.state === 'open').length,
    [complaints]
  );

  const closeComplaint = (id) => {
    setComplaints((prev) =>
      prev.map((item) => (item.id === id ? { ...item, state: 'resolved' } : item))
    );
  };

  const handleFirebaseChange = (field, value) => {
    setFirebaseConfig((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const validateFirebaseConfig = () => {
    const errors = {};

    if (!firebaseConfig.databaseUrl.trim()) {
      errors.databaseUrl = t('validationRequiredField', { field: t('firebaseDatabaseUrl') });
    } else {
      try {
        new URL(firebaseConfig.databaseUrl.trim());
      } catch {
        errors.databaseUrl = t('validationFirebaseUrl');
      }
    }

    if (!firebaseConfig.path.trim()) {
      errors.path = t('validationRequiredField', { field: t('firebaseDataPath') });
    }

    return errors;
  };

  const saveFirebaseSettings = () => {
    const errors = validateFirebaseConfig();
    setFirebaseErrors(errors);
    setFirebaseMessage('');

    if (Object.keys(errors).length > 0) {
      return;
    }

    localStorage.setItem('firebaseConfig', JSON.stringify(firebaseConfig));
    setFirebaseMessage(t('firebaseSettingsSaved'));
  };

  const syncBeneficiariesToFirebase = async () => {
    const errors = validateFirebaseConfig();
    setFirebaseErrors(errors);
    setFirebaseMessage('');

    if (Object.keys(errors).length > 0) {
      return;
    }

    const databaseUrl = firebaseConfig.databaseUrl.trim().replace(/\/+$/, '');
    const dataPath = firebaseConfig.path.trim().replace(/^\/+|\/+$/g, '');
    const authQuery = firebaseConfig.authToken.trim()
      ? `?auth=${encodeURIComponent(firebaseConfig.authToken.trim())}`
      : '';

    setFirebaseLoading(true);
    try {
      const response = await fetch(`${databaseUrl}/${dataPath}.json${authQuery}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          village: VILLAGE_NAME,
          updatedAt: new Date().toISOString(),
          beneficiaries
        })
      });

      if (!response.ok) {
        throw new Error('Firebase sync failed');
      }

      setFirebaseMessage(t('firebaseSyncSuccess'));
    } catch {
      setFirebaseMessage(t('firebaseSyncFailed'));
    } finally {
      setFirebaseLoading(false);
    }
  };

  return (
    <div>
      <Header onProfileClick={() => setActiveTab('profile')} />
      <div className="dashboard-layout">
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <a 
              href="#dashboard" 
              className={`sidebar-item ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); }}
            >
              <span className="sidebar-icon">📊</span>
              <span className="sidebar-label">{t('dashboard')}</span>
            </a>
            <a 
              href="#profile" 
              className={`sidebar-item ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('profile'); }}
            >
              <span className="sidebar-icon">👤</span>
              <span className="sidebar-label">{t('profile')}</span>
            </a>
          </nav>
        </aside>

        <main className="dashboard-main">
          {activeTab === 'profile' ? (
            <Profile />
          ) : (
            <>
              <div className="page-header">
                <h1 className="page-title">{t('sarpanchDashboardTitle')}</h1>
              </div>

              <section className="card">
                <p>
                  <strong>{t('villageNameLabel')}:</strong> {t('villageName')}
                </p>
              </section>

              <div className="stats-grid">
                <article className="stats-card">
                  <p className="stats-title">{t('openComplaints')}</p>
                  <p className="stats-value">{activeComplaints}</p>
                </article>
                <article className="stats-card">
                  <p className="stats-title">{t('totalBeneficiaries')}</p>
                  <p className="stats-value">{beneficiaries.length}</p>
                </article>
              </div>

              <div className="grid grid-cols-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                <section className="card" style={{ height: '400px' }}>
                  <h2 style={{ marginBottom: '1.5rem' }}>{t('Distribution Overview') || 'Distribution Overview'}</h2>
                  <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                      <Pie
                        data={overviewData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {overviewData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }}
                        itemStyle={{ color: '#f8fafc' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </section>

                <section className="card" style={{ height: '400px' }}>
                  <h2 style={{ marginBottom: '1.5rem' }}>{t('Beneficiaries Per Ward') || 'Beneficiaries Per Ward'}</h2>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={wardData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" />
                      <XAxis type="number" stroke="#94a3b8" />
                      <YAxis dataKey="name" type="category" stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }}
                        itemStyle={{ color: '#f8fafc' }}
                      />
                      <Bar dataKey="count" fill="#3b82f6" radius={[0, 4, 4, 0]} name={t('beneficiaries') || 'Beneficiaries'} />
                    </BarChart>
                  </ResponsiveContainer>
                </section>
              </div>

              <section className="card">
                <h2>{t('All Beneficiaries List')}</h2>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th align="left">{t('headOfFamily')}</th>
                        <th align="left">{t('rationCardNumber')}</th>
                        <th align="left">{t('rationCardType')}</th>
                        <th align="left">{t('address')}</th>
                        <th align="left">{t('totalMembers')}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {beneficiaries.length ? (
                        beneficiaries.map((beneficiary) => (
                          <tr key={beneficiary.id}>
                            <td>{beneficiary.headName}</td>
                            <td>{beneficiary.rationCardNo}</td>
                            <td>{t(`cardType_${beneficiary.cardType}`) || beneficiary.cardType}</td>
                            <td>{beneficiary.address}</td>
                            <td>{beneficiary.totalMembers}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5}>{t('No Beneficiary Added')}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="card">
                <h2>{t('System Complaints Oversight')}</h2>
                <ul>
                  {complaints.map((complaint) => (
                    <li key={complaint.id} style={{ marginBottom: '0.75rem' }}>
                      {t(complaint.textKey)} - <strong>{t(`state_${complaint.state}`)}</strong>{' '}
                      {complaint.state === 'open' ? (
                        <button type="button" className="action-button secondary-action" onClick={() => closeComplaint(complaint.id)}>
                          {t('markResolved')}
                        </button>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default PanchayatDashboardPage;
