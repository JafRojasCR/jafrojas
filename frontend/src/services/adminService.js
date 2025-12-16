import api from './api';

export const adminService = {
  getAdmins: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  createAdmin: async (data) => {
    const response = await api.post('/admin/users', data);
    return response.data;
  },

  updateAdmin: async (id, data) => {
    const response = await api.put(`/admin/users/${id}`, data);
    return response.data;
  },

  deleteAdmin: async (id) => {
    const response = await api.delete(`/admin/users/${id}`);
    return response.data;
  }
};
