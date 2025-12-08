import api from './api';

export const socialMediaService = {
  getAllSocialMedia: async () => {
    const response = await api.get('/social-media');
    return response.data;
  },

  getSocialMediaById: async (id) => {
    const response = await api.get(`/social-media/${id}`);
    return response.data;
  },

  createSocialMedia: async (socialMediaData) => {
    const response = await api.post('/social-media', socialMediaData);
    return response.data;
  },

  updateSocialMedia: async (id, socialMediaData) => {
    const response = await api.put(`/social-media/${id}`, socialMediaData);
    return response.data;
  },

  deleteSocialMedia: async (id) => {
    const response = await api.delete(`/social-media/${id}`);
    return response.data;
  }
};
