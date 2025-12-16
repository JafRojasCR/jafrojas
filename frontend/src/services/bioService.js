import api from './api';

export const bioService = {
  getBio: async () => {
    const response = await api.get('/bio');
    return response.data;
  },

  saveBio: async (bioData) => {
    const response = await api.put('/bio', bioData);
    return response.data;
  }
};
