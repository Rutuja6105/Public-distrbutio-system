export const notificationService = {
  getAll: () => api.get('/notifications'),
  markAsRead: (id) => api.put(`/notifications/${id}/read`),
  delete: (id) => api.delete(`/notifications/${id}`),
  send: (data) => api.post('/notifications', data)
};
