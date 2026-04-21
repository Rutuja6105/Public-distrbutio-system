export const shopService = {
  getDashboardStats: () => api.get('/shop/stats'),
  getCardholders: () => api.get('/shop/cardholders'),
  getDistributions: () => api.get('/shop/distributions'),
  markCollection: (data) => api.post('/shop/collections', data),
  sendNotification: (data) => api.post('/shop/notifications', data),
  getStock: () => api.get('/shop/stock'),
  updateStock: (data) => api.put('/shop/stock', data)
};