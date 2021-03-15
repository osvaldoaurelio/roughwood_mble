import api from '../services/api';

export const mineOrders = async () => {
  try {
    const { data } = await api.get('orders/mine');

    return data;
  } catch ({ response }) {
    return response.data;
  }
};

export const progress = async ({ id }) => {
  try {
    const { data } = await api.put(`orders/${id}/progress`);

    return data;
  } catch ({ response }) {
    return response.data;
  }
};

export const done = async ({ id }) => {
  try {
    const { data } = await api.put(`orders/${id}/done`);

    return data;
  } catch ({ response }) {
    return response.data;
  }
};
