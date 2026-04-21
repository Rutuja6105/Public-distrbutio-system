export const cardholderService = {
  getProfile: () => api.get('/cardholder/profile'),
  updateProfile: (data) => api.put('/cardholder/profile', data),
  getDistributions: () => api.get('/cardholder/distributions'),
  getTransactions: () => api.get('/cardholder/transactions'),
  getNotifications: () => api.get('/cardholder/notifications')
};
