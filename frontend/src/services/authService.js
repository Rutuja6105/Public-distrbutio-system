export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      if (response.token) {
        storage.set('token', response.token);
        storage.set('user', response.user);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (response.token) {
        storage.set('token', response.token);
        storage.set('user', response.user);
      }
      return response;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    storage.remove('token');
    storage.remove('user');
  },

  getCurrentUser: () => {
    return storage.get('user');
  },

  isAuthenticated: () => {
    return !!storage.get('token');
  }
};
