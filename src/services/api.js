import { create } from 'axios';

const api = create({
  baseURL: 'https://roughwood-api.herokuapp.com/api',
});

export default api;
