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
    user_types: `${BASE_URL}/user-types`,

  },
  COLABORADORES: {
    colaborador: `${BASE_URL}/colaboradores`,
    search: `${BASE_URL}/colaboradores/search`,
    get_status:`${BASE_URL}/user-types`,

  },

};
