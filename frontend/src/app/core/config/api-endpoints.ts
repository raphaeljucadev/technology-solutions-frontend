const BASE_URL = 'http://localhost:80/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${BASE_URL}/login`,
    LOGOUT: `${BASE_URL}/logout`,
  },

  CONVITES: {
    CONVITE: `${BASE_URL}/convites`,
    STATUS_CONVITE: `${BASE_URL}/convites`,
    CONVITE_GET_TOKEN: `${BASE_URL}/status-convites`,
    CONVITE_TOKEN: `${BASE_URL}/convites-get`,


  },
  PERFIL: {
    user_types: `${BASE_URL}/user-types`,

  },
  COLABORADORES: {
    colaborador: `${BASE_URL}/colaboradores`,
    search: `${BASE_URL}/colaboradores/search`,
    get_status:`${BASE_URL}/user-types`,

  },

  CADASTRO: {
    endereco: `${BASE_URL}/endereco`,
    telefone: `${BASE_URL}/telefone`,
    get_status:`${BASE_URL}/user-types`,
    user: `${BASE_URL}/users`,


  },

};
