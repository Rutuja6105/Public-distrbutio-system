import React, { useMemo, useState } from 'react';
import Header from '../components/common/Header';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import ComplaintSection from '../components/common/ComplaintSection';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts';
import Profile from '../components/shopowner/Profile';

const VILLAGE_NAME = 'Narshingpur';

const createEmptyMember = () => ({
  name: '',
  age: '',
  birthDate: '',
  gender: '',
  occupation: '',
  aadhaar: ''
});

const initialBeneficiaries = [
  {
    id: 1,
    name: 'Ravi Kumar',
    cardNo: 'RC-1021',
    phone: '9876543210',
    queueNo: 4,
    status: 'pending',
    address: `${VILLAGE_NAME} Ward 1`,
    totalMembers: 1,
    cardType: 'orange',
    familyMembers: [{ name: 'Suman Kumar', age: '35', birthDate: '1990-01-01', gender: 'female', occupation: 'Housewife', aadhaar: '123456789012' }]
  },
  {
    id: 2,
    name: 'Sita Devi',
    cardNo: 'RC-1022',
    phone: '9876543211',
    queueNo: 5,
    status: 'pending',
    address: `${VILLAGE_NAME} Ward 2`,
    totalMembers: 1,
    cardType: 'white',
    familyMembers: [{ name: 'Ram Devi', age: '40', birthDate: '1985-05-05', gender: 'male', occupation: 'Farmer', aadhaar: '223456789012' }]
  },
  {
    id: 3,
    name: 'Imran Ali',
    cardNo: 'RC-1023',
    phone: '9876543212',
    queueNo: 6,
    status: 'collected',
    address: `${VILLAGE_NAME} Ward 3`,
    totalMembers: 1,
    cardType: 'yellow',
    familyMembers: [{ name: 'Sara Ali', age: '25', birthDate: '2000-10-10', gender: 'female', occupation: 'Student', aadhaar: '323456789012' }]
  }
];

const distributionData = [
  { name: 'Rice', total: 500, collected: 320, pending: 180 },
  { name: 'Wheat', total: 400, collected: 250, pending: 150 },
  { name: 'Sugar', total: 100, collected: 85, pending: 15 },
  { name: 'Oil', total: 150, collected: 110, pending: 40 },
];

const dailyData = [
  { day: 'Mon', count: 45 },
  { day: 'Tue', count: 52 },
  { day: 'Wed', count: 38 },
  { day: 'Thu', count: 65 },
  { day: 'Fri', count: 48 },
  { day: 'Sat', count: 70 },
  { day: 'Sun', count: 20 },
];

const ShopOwnerDashboardPage = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [beneficiaries, setBeneficiaries] = useState(initialBeneficiaries);
  const [messageForm, setMessageForm] = useState(() => ({
    target: 'single',
    beneficiaryId: initialBeneficiaries[0].id,
    scheduleDate: '',
    scheduleTime: '',
    message: t('defaultScheduleMessage')
  }));
  const [beneficiaryForm, setBeneficiaryForm] = useState({
    headName: '',
    headAge: '',
    headBirthDate: '',
    headGender: '',
    headIncome: '',
    headAadhaar: '',
    phone: '',
    rationCardNo: '',
    address: '',
    cardType: 'orange',
    familyMembers: [createEmptyMember()]
  });
  const [formErrors, setFormErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');
  const [lastNotice, setLastNotice] = useState('');
  const [noticeErrors, setNoticeErrors] = useState({});
  const [editingId, setEditingId] = useState(null);

  const pendingCount = useMemo(
    () => beneficiaries.filter((item) => item.status === 'pending').length,
    [beneficiaries]
  );

  const collectedCount = useMemo(
    () => beneficiaries.filter((item) => item.status === 'collected').length,
    [beneficiaries]
  );

  const handleBeneficiaryChange = (field, value) => {
    setBeneficiaryForm((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleMemberChange = (index, field, value) => {
    setBeneficiaryForm((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.map((member, memberIndex) =>
        memberIndex === index ? { ...member, [field]: value } : member
      )
    }));
  };

  const addFamilyMember = () => {
    setBeneficiaryForm((prev) => ({
      ...prev,
      familyMembers: [...prev.familyMembers, createEmptyMember()]
    }));
  };

  const removeFamilyMember = (index) => {
    setBeneficiaryForm((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.filter((_, memberIndex) => memberIndex !== index)
    }));
  };

  const validateBeneficiaryForm = () => {
    const errors = {};
    const rationCardPattern = /^[A-Za-z0-9-]{6,20}$/;
    const aadhaarPattern = /^\d{12}$/;

    if (!beneficiaryForm.headName.trim()) {
      errors.headName = t('validationRequiredField', { field: t('headOfFamily') });
    }
    if (!beneficiaryForm.headAge.toString().trim()) {
      errors.headAge = t('validationRequiredField', { field: t('headAge') });
    }
    if (!beneficiaryForm.headBirthDate) {
      errors.headBirthDate = t('validationRequiredField', { field: t('headBirthDate') });
    }
    if (!beneficiaryForm.headGender) {
      errors.headGender = t('validationRequiredField', { field: t('headGender') });
    }
    if (!beneficiaryForm.headIncome.toString().trim()) {
      errors.headIncome = t('validationRequiredField', { field: t('headIncome') });
    }
    if (!beneficiaryForm.headAadhaar.trim() || !aadhaarPattern.test(beneficiaryForm.headAadhaar.trim())) {
      errors.headAadhaar = t('validationAadhaar');
    }
    if (!beneficiaryForm.phone.trim() || !/^\d{10}$/.test(beneficiaryForm.phone.trim())) {
      errors.phone = t('validationMobileNumber') || 'Valid 10-digit phone number required';
    }

    if (!beneficiaryForm.rationCardNo.trim()) {
      errors.rationCardNo = t('validationRequiredField', { field: t('rationCardNumber') });
    } else if (!rationCardPattern.test(beneficiaryForm.rationCardNo.trim())) {
      errors.rationCardNo = t('validationRationCard');
    } else if (
      beneficiaries.some(
        (person) => 
          person.cardNo.toLowerCase() === beneficiaryForm.rationCardNo.trim().toLowerCase() && 
          person.id !== editingId
      )
    ) {
      errors.rationCardNo = t('validationDuplicateRationCard');
    }
    if (!beneficiaryForm.address.trim()) {
      errors.address = t('validationRequiredField', { field: t('address') });
    }
    if (!beneficiaryForm.cardType) {
      errors.cardType = t('validationRequiredField', { field: t('rationCardType') });
    }
    if (!beneficiaryForm.familyMembers.length) {
      errors.familyMembers = t('validationAtLeastOneMember');
      return errors;
    }

    const familyMemberErrors = {};
    beneficiaryForm.familyMembers.forEach((member, index) => {
      const memberError = {};
      const age = Number(member.age);

      if (!member.name.trim()) {
        memberError.name = t('validationRequiredField', { field: t('memberName') });
      }
      if (!member.age.toString().trim()) {
        memberError.age = t('validationRequiredField', { field: t('memberAge') });
      } else if (Number.isNaN(age) || age < 0 || age > 120) {
        memberError.age = t('validationAgeRange');
      }
      if (!member.birthDate) {
        memberError.birthDate = t('validationRequiredField', { field: t('birthDate') });
      }
      if (!member.gender) {
        memberError.gender = t('validationRequiredField', { field: t('gender') });
      }
      if (!member.occupation.trim()) {
        memberError.occupation = t('validationRequiredField', { field: t('occupation') });
      }
      if (!member.aadhaar.trim() || !aadhaarPattern.test(member.aadhaar.trim())) {
        memberError.aadhaar = t('validationAadhaar');
      }

      if (Object.keys(memberError).length > 0) {
        familyMemberErrors[index] = memberError;
      }
    });

    if (Object.keys(familyMemberErrors).length > 0) {
      errors.familyMembers = familyMemberErrors;
    }

    return errors;
  };

  const handleAddBeneficiary = (e) => {
    e.preventDefault();
    const errors = validateBeneficiaryForm();
    setFormErrors(errors);
    setFormMessage('');

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (editingId) {
      setBeneficiaries((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
              ...item,
              name: beneficiaryForm.headName.trim(),
              cardNo: beneficiaryForm.rationCardNo.trim().toUpperCase(),
              phone: beneficiaryForm.phone.trim(),
              address: beneficiaryForm.address.trim(),
              cardType: beneficiaryForm.cardType,
              totalMembers: beneficiaryForm.familyMembers.length,
              familyMembers: beneficiaryForm.familyMembers
            }
            : item
        )
      );
      setFormMessage('Beneficiary updated successfully.');
      setEditingId(null);
    } else {
      const nextQueueNo = beneficiaries.length
        ? Math.max(...beneficiaries.map((person) => person.queueNo)) + 1
        : 1;
      const newBeneficiary = {
        id: Date.now(),
        name: beneficiaryForm.headName.trim(),
        cardNo: beneficiaryForm.rationCardNo.trim().toUpperCase(),
        phone: beneficiaryForm.phone.trim(),
        queueNo: nextQueueNo,
        status: 'pending',
        address: beneficiaryForm.address.trim(),
        cardType: beneficiaryForm.cardType,
        totalMembers: beneficiaryForm.familyMembers.length,
        familyMembers: beneficiaryForm.familyMembers
      };

      setBeneficiaries((prev) => [newBeneficiary, ...prev]);
      setMessageForm((prev) => ({
        ...prev,
        beneficiaryId: newBeneficiary.id
      }));
      setFormMessage(t('beneficiaryAddedSuccess'));
    }

    setBeneficiaryForm({
      headName: '',
      headAge: '',
      headBirthDate: '',
      headGender: '',
      headIncome: '',
      headAadhaar: '',
      rationCardNo: '',
      address: '',
      phone: '',
      cardType: 'orange',
      familyMembers: [createEmptyMember()]
    });
    setFormErrors({});
  };

  const handleEditBeneficiary = (person) => {
    setEditingId(person.id);
    setBeneficiaryForm({
      headName: person.name,
      headAge: '', // These fields are not in the main table data yet, so we leave them blank or extend the data
      headBirthDate: '',
      headGender: '',
      headIncome: '',
      headAadhaar: '',
      phone: person.phone || '',
      rationCardNo: person.cardNo,
      address: person.address,
      cardType: person.cardType || 'orange',
      familyMembers: person.familyMembers && person.familyMembers.length > 0 
        ? person.familyMembers 
        : Array(person.totalMembers || 1).fill(0).map(() => createEmptyMember())
    });
    // Scroll to form
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleDeleteBeneficiary = (id) => {
    if (window.confirm('Are you sure you want to delete this beneficiary?')) {
      setBeneficiaries((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setBeneficiaryForm({
      headName: '',
      headAge: '',
      headBirthDate: '',
      headGender: '',
      headIncome: '',
      headAadhaar: '',
      rationCardNo: '',
      address: '',
      phone: '',
      cardType: 'orange',
      familyMembers: [createEmptyMember()]
    });
    setFormErrors({});
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const errors = {};

    if (messageForm.target === 'single' && !messageForm.beneficiaryId) {
      errors.beneficiaryId = t('validationRequiredField', { field: t('beneficiary') });
    }
    if (messageForm.target === 'mobile' && (!messageForm.mobileNumber || !/^\d{10}$/.test(messageForm.mobileNumber))) {
      errors.mobileNumber = t('validationMobileNumber') || 'Please enter a valid 10-digit mobile number';
    }
    if (!messageForm.scheduleDate) {
      errors.scheduleDate = t('validationRequiredField', { field: t('scheduleDate') });
    }
    if (!messageForm.scheduleTime) {
      errors.scheduleTime = t('validationRequiredField', { field: t('scheduleTime') });
    }
    if (!messageForm.message.trim()) {
      errors.message = t('validationRequiredField', { field: t('message') });
    }

    setNoticeErrors(errors);
    setLastNotice('');

    if (Object.keys(errors).length > 0) {
      return;
    }

    const scheduleText = `${messageForm.scheduleDate || t('today')} ${messageForm.scheduleTime || ''}`.trim();

    if (messageForm.target === 'single') {
      const beneficiary = beneficiaries.find((item) => item.id === Number(messageForm.beneficiaryId));
      if (!beneficiary) {
        return;
      }

      setLastNotice(
        t('messageSentNotice', {
          name: beneficiary.name,
          message: messageForm.message,
          schedule: scheduleText
        })
      );
      return;
    }

    if (messageForm.target === 'mobile') {
      setLastNotice(
        `Message sent to ${messageForm.mobileNumber}: "${messageForm.message}" scheduled for ${scheduleText}`
      );
      return;
    }

    setLastNotice(
      t('messageSentAllNotice', {
        count: beneficiaries.length,
        message: messageForm.message,
        schedule: scheduleText
      })
    );
  };

  const updateCollectionStatus = (id, status) => {
    setBeneficiaries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
  };

  return (
    <div>
      <Header onProfileClick={() => setActiveTab('profile')} />
      <div className="dashboard-layout">
        <main className="dashboard-main">
          {activeTab === 'profile' ? (
            <Profile />
          ) : (
            <>
              <div className="page-header">
                <h1 className="page-title">{t('shopOwnerDashboardTitle')}</h1>
              </div>

              <section className="card">
                <p>
                  <strong>{t('villageNameLabel')}:</strong> {t('villageName')}
                </p>
              </section>

              <div className="stats-grid">
                <article className="stats-card">
                  <p className="stats-title">{t('totalBeneficiaries')}</p>
                  <p className="stats-value">{beneficiaries.length}</p>
                </article>
                <article className="stats-card">
                  <p className="stats-title">{t('pendingCollection')}</p>
                  <p className="stats-value">{pendingCount}</p>
                </article>
                <article className="stats-card">
                  <p className="stats-title">{t('collected')}</p>
                  <p className="stats-value">{collectedCount}</p>
                </article>
              </div>

              <div className="grid grid-cols-2" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                <section className="card" style={{ height: '400px' }}>
                  <h2 style={{ marginBottom: '1.5rem' }}>{t('distributionProgress') || 'Distribution Progress'}</h2>
                  <ResponsiveContainer width="100%" height="90%">
                    <BarChart data={distributionData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }}
                        itemStyle={{ color: '#f8fafc' }}
                      />
                      <Legend />
                      <Bar dataKey="collected" fill="#10b981" name={t('collected') || 'Collected'} radius={[4, 4, 0, 0]} />
                      <Bar dataKey="pending" fill="#f59e0b" name={t('pendingCollection') || 'Pending'} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </section>

          <section className="card" style={{ height: '400px' }}>
            <h2 style={{ marginBottom: '1.5rem' }}>{t('dailyBeneficiaryTraffic') || 'Daily Beneficiary Traffic'}</h2>
            <ResponsiveContainer width="100%" height="90%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Line type="monotone" dataKey="count" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6' }} activeDot={{ r: 8 }} name={t('beneficiaries') || 'Beneficiaries'} />
              </LineChart>
            </ResponsiveContainer>
          </section>
        </div>

        <section className="card">
          <h2>{editingId ? 'Edit Beneficiary' : t('addBeneficiaryTitle')}</h2>
          <form onSubmit={handleAddBeneficiary}>
            <div className="grid grid-cols-3" style={{ columnGap: '1rem', rowGap: '1rem', marginBottom: '2rem' }}>
              <label>
                {t('headOfFamily')}
                <input
                  type="text"
                  value={beneficiaryForm.headName}
                  onChange={(e) => handleBeneficiaryChange('headName', e.target.value)}
                />
                {formErrors.headName ? <p className="error-message">{formErrors.headName}</p> : null}
              </label>

              <label>
                {t('headAge')}
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={beneficiaryForm.headAge}
                  onChange={(e) => handleBeneficiaryChange('headAge', e.target.value)}
                />
                {formErrors.headAge ? <p className="error-message">{formErrors.headAge}</p> : null}
              </label>

              <label>
                {t('headBirthDate')}
                <input
                  type="date"
                  value={beneficiaryForm.headBirthDate}
                  onChange={(e) => handleBeneficiaryChange('headBirthDate', e.target.value)}
                />
                {formErrors.headBirthDate ? <p className="error-message">{formErrors.headBirthDate}</p> : null}
              </label>

              <label>
                {t('headGender')}
                <select
                  value={beneficiaryForm.headGender}
                  onChange={(e) => handleBeneficiaryChange('headGender', e.target.value)}
                >
                  <option value="">{t('selectGender')}</option>
                  <option value="male">{t('male')}</option>
                  <option value="female">{t('female')}</option>
                  <option value="other">{t('other')}</option>
                </select>
                {formErrors.headGender ? <p className="error-message">{formErrors.headGender}</p> : null}
              </label>

              <label>
                {t('headIncome')}
                <input
                  type="number"
                  min="0"
                  value={beneficiaryForm.headIncome}
                  onChange={(e) => handleBeneficiaryChange('headIncome', e.target.value)}
                />
                {formErrors.headIncome ? <p className="error-message">{formErrors.headIncome}</p> : null}
              </label>

              <label>
                {t('aadhaarNumber')}
                <input
                  type="text"
                  maxLength="12"
                  value={beneficiaryForm.headAadhaar}
                  onChange={(e) => handleBeneficiaryChange('headAadhaar', e.target.value)}
                />
                {formErrors.headAadhaar ? <p className="error-message">{formErrors.headAadhaar}</p> : null}
              </label>

              <label>
                {t('mobileNumber') || 'Mobile Number'}
                <input
                  type="tel"
                  maxLength="10"
                  value={beneficiaryForm.phone}
                  onChange={(e) => handleBeneficiaryChange('phone', e.target.value)}
                />
                {formErrors.phone ? <p className="error-message">{formErrors.phone}</p> : null}
              </label>

              <label>
                {t('rationCardNumber')}
                <input
                  type="text"
                  value={beneficiaryForm.rationCardNo}
                  onChange={(e) => handleBeneficiaryChange('rationCardNo', e.target.value)}
                />
                {formErrors.rationCardNo ? <p className="error-message">{formErrors.rationCardNo}</p> : null}
              </label>

              <label style={{ gridColumn: 'span 2' }}>
                {t('address')}
                <input
                  type="text"
                  value={beneficiaryForm.address}
                  onChange={(e) => handleBeneficiaryChange('address', e.target.value)}
                />
                {formErrors.address ? <p className="error-message">{formErrors.address}</p> : null}
              </label>

              <label>
                {t('rationCardType')}
                <select
                  value={beneficiaryForm.cardType}
                  onChange={(e) => handleBeneficiaryChange('cardType', e.target.value)}
                >
                  <option value="orange">{t('cardType_orange')}</option>
                  <option value="white">{t('cardType_white')}</option>
                  <option value="yellow">{t('cardType_yellow')}</option>
                </select>
                {formErrors.cardType ? <p className="error-message">{formErrors.cardType}</p> : null}
              </label>
            </div>

            <h3>{t('familyMembersDetails')}</h3>
            {typeof formErrors.familyMembers === 'string' ? (
              <p className="error-message">{formErrors.familyMembers}</p>
            ) : null}

            {beneficiaryForm.familyMembers.map((member, index) => {
              const memberErrors = formErrors.familyMembers?.[index] || {};

              return (
                <div key={index} className="family-member-panel">
                  <p style={{ fontWeight: 600, marginBottom: '0.75rem' }}>
                    {t('familyMemberLabel', { number: index + 1 })}
                  </p>
                  <div className="grid grid-cols-3" style={{ columnGap: '1rem', rowGap: '1rem' }}>
                    <label>
                      {t('memberName')}
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleMemberChange(index, 'name', e.target.value)}
                      />
                      {memberErrors.name ? <p className="error-message">{memberErrors.name}</p> : null}
                    </label>

                    <label>
                      {t('memberAge')}
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={member.age}
                        onChange={(e) => handleMemberChange(index, 'age', e.target.value)}
                      />
                      {memberErrors.age ? <p className="error-message">{memberErrors.age}</p> : null}
                    </label>

                    <label>
                      {t('birthDate')}
                      <input
                        type="date"
                        value={member.birthDate}
                        onChange={(e) => handleMemberChange(index, 'birthDate', e.target.value)}
                      />
                      {memberErrors.birthDate ? <p className="error-message">{memberErrors.birthDate}</p> : null}
                    </label>

                    <label>
                      {t('gender')}
                      <select
                        value={member.gender}
                        onChange={(e) => handleMemberChange(index, 'gender', e.target.value)}
                      >
                        <option value="">{t('selectGender')}</option>
                        <option value="male">{t('male')}</option>
                        <option value="female">{t('female')}</option>
                        <option value="other">{t('other')}</option>
                      </select>
                      {memberErrors.gender ? <p className="error-message">{memberErrors.gender}</p> : null}
                    </label>

                    <label>
                      {t('occupation')}
                      <input
                        type="text"
                        value={member.occupation}
                        onChange={(e) => handleMemberChange(index, 'occupation', e.target.value)}
                      />
                      {memberErrors.occupation ? <p className="error-message">{memberErrors.occupation}</p> : null}
                    </label>

                    <label>
                      {t('aadhaarNumber')}
                      <input
                        type="text"
                        maxLength="12"
                        value={member.aadhaar}
                        onChange={(e) => handleMemberChange(index, 'aadhaar', e.target.value)}
                      />
                      {memberErrors.aadhaar ? <p className="error-message">{memberErrors.aadhaar}</p> : null}
                    </label>
                  </div>

                  {beneficiaryForm.familyMembers.length > 1 ? (
                    <button
                      type="button"
                      className="action-button danger-action"
                      onClick={() => removeFamilyMember(index)}
                    >
                      {t('removeMember')}
                    </button>
                  ) : null}
                </div>
              );
            })}

            <div className="form-actions" style={{ gap: '1.5rem' }}>
              <button type="submit" className="action-button primary-action">
                {editingId ? 'Update Beneficiary' : t('submitBeneficiary')}
              </button>
              {editingId && (
                <button type="button" className="action-button secondary-action" onClick={handleCancelEdit}>
                  Cancel
                </button>
              )}
              <button type="button" className="action-button secondary-action" onClick={addFamilyMember}>
                {t('addFamilyMember')}
              </button>
            </div>
            {formMessage ? <p className="success-message">{formMessage}</p> : null}
          </form>
        </section>

        <section className="card">
          <h2>{t('sendRationScheduleMessage')}</h2>
          <form onSubmit={handleSendMessage} className="grid grid-cols-2">
            <label>
              {t('notificationTarget')}
              <select
                value={messageForm.target}
                onChange={(e) => setMessageForm({ ...messageForm, target: e.target.value })}
              >
                <option value="single">{t('singleBeneficiary')}</option>
                <option value="all">{t('allBeneficiaries')}</option>
                <option value="mobile">{t('mobileNumber') || 'Mobile Number'}</option>
              </select>
            </label>

            {messageForm.target === 'single' && (
              <label>
                {t('beneficiary')}
                <select
                  value={messageForm.beneficiaryId}
                  onChange={(e) => setMessageForm({ ...messageForm, beneficiaryId: e.target.value })}
                >
                  {beneficiaries.map((person) => (
                    <option key={person.id} value={person.id}>
                      {person.name} ({person.cardNo})
                    </option>
                  ))}
                </select>
                {noticeErrors.beneficiaryId ? <p className="error-message">{noticeErrors.beneficiaryId}</p> : null}
              </label>
            )}

            {messageForm.target === 'mobile' && (
              <label>
                {t('mobileNumber') || 'Mobile Number'}
                <input
                  type="tel"
                  placeholder="Enter 10-digit mobile number"
                  value={messageForm.mobileNumber || ''}
                  onChange={(e) => setMessageForm({ ...messageForm, mobileNumber: e.target.value })}
                />
                {noticeErrors.mobileNumber ? <p className="error-message">{noticeErrors.mobileNumber}</p> : null}
              </label>
            )}

            {messageForm.target === 'all' && (
              <div className="broadcast-summary">
                <strong>{t('allBeneficiaries')}:</strong> {beneficiaries.length}
              </div>
            )}

            <label>
              {t('scheduleDate')}
              <input
                type="date"
                value={messageForm.scheduleDate}
                onChange={(e) => setMessageForm({ ...messageForm, scheduleDate: e.target.value })}
              />
              {noticeErrors.scheduleDate ? <p className="error-message">{noticeErrors.scheduleDate}</p> : null}
            </label>

            <label>
              {t('scheduleTime')}
              <input
                type="time"
                value={messageForm.scheduleTime}
                onChange={(e) => setMessageForm({ ...messageForm, scheduleTime: e.target.value })}
              />
              {noticeErrors.scheduleTime ? <p className="error-message">{noticeErrors.scheduleTime}</p> : null}
            </label>

            <label>
              {t('message')}
              <input
                type="text"
                value={messageForm.message}
                onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
              />
              {noticeErrors.message ? <p className="error-message">{noticeErrors.message}</p> : null}
            </label>

            <button type="submit" className="action-button primary-action">{t('sendNotice')}</button>
          </form>
          {lastNotice ? <p className="success-message">{lastNotice}</p> : null}
        </section>

        <section className="card">
          <h2>{t('allBeneficiariesList')}</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                   <th align="left">{t('name')}</th>
                  <th align="left">{t('cardNumber')}</th>
                  <th align="left">{t('mobileNumber') || 'Mobile Number'}</th>
                  <th align="left">{t('rationCardType')}</th>
                  <th align="left">{t('address')}</th>
                  <th align="left">{t('totalMembers')}</th>
                  <th align="left">{t('status')}</th>
                  <th align="left">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {beneficiaries.map((person) => (
                  <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.cardNo}</td>
                    <td>{person.phone}</td>
                    <td>{t(`cardType_${person.cardType}`) || person.cardType}</td>
                    <td>{person.address}</td>
                    <td>{person.totalMembers}</td>
                    <td>{t(`status_${person.status}`)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                          type="button"
                          className="action-button secondary-action"
                          style={{ minHeight: '32px', padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                          onClick={() => handleEditBeneficiary(person)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="action-button danger-action"
                          style={{ minHeight: '32px', padding: '0.4rem 0.8rem', fontSize: '0.8rem', marginTop: 0 }}
                          onClick={() => handleDeleteBeneficiary(person.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="card">
          <h2>{t('markCollectionStatus')}</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th align="left">{t('name')}</th>
                  <th align="left">{t('cardNumber')}</th>
                  <th align="left">{t('queueNumber')}</th>
                  <th align="left">{t('status')}</th>
                  <th align="left">{t('action')}</th>
                </tr>
              </thead>
              <tbody>
                {beneficiaries.map((person) => (
                  <tr key={person.id}>
                    <td>{person.name}</td>
                    <td>{person.cardNo}</td>
                    <td>{person.queueNo}</td>
                    <td>{t(`status_${person.status}`)}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button
                          type="button"
                          className="action-button primary-action"
                          onClick={() => updateCollectionStatus(person.id, 'collected')}
                        >
                          {t('collected')}
                        </button>
                        <button
                          type="button"
                          className="action-button secondary-action"
                          onClick={() => updateCollectionStatus(person.id, 'not_collected')}
                        >
                          {t('notCollected')}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <ComplaintSection />
      </>
    )}
  </main>
</div>
</div>
);
};

export default ShopOwnerDashboardPage;
