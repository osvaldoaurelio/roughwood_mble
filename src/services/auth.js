import api from '../services/api';

export const signInService = async ({ username, password }) => {
  const payload = { session: { username, password } };

  try {
    const { data } = await api.post('sessions/user', payload);
    
    return data;
  } catch ({ response }) {
    return response.data;
  }
};
