import api from './api';

export const contactService = {
  getContacts: async () => {
    const response = await api.get('/contact');
    return response.data;
  },

  createContact: async (data) => {
    const response = await api.post('/contact', data);
    return response.data;
  },

  updateContact: async (id, data) => {
    const response = await api.put(`/contact/${id}`, data);
    return response.data;
  },

  deleteContact: async (id) => {
    const response = await api.delete(`/contact/${id}`);
    return response.data;
  }
};
