const BASE_URL = 'http://127.0.0.1:8001/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/login`,
  },

  CONVITES: {
    CONVITE: `${BASE_URL}/convites`,
    STATUS_CONVITE: `${BASE_URL}/convites`,
    CONVITE_GET_TOKEN: `${BASE_URL}/status-convites`,

  },
  PERFIL: {
    CONVITE: `${BASE_URL}/user-types`,

  },

};
