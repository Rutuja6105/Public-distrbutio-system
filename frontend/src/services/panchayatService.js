export const panchayatService = {
  getDashboardStats: () => api.get('/panchayat/stats'),
  getShops: () => api.get('/panchayat/shops'),
  getCardholders: () => api.get('/panchayat/cardholders'),
  getReports: () => api.get('/panchayat/reports'),
  generateReport: (data) => api.post('/panchayat/reports', data),
  addShop: (data) => api.post('/panchayat/shops', data),
  updateShop: (id, data) => api.put(`/panchayat/shops/${id}`, data),
  deleteShop: (id) => api.delete(`/panchayat/shops/${id}`)
};