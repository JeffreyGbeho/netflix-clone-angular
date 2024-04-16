const BASE_URL = 'http://localhost:8080/api/v1';

export const environment = {
  production: false,
  baseUrl: BASE_URL,
  endpoints: {
    auth: `${BASE_URL}/auth`,
    profile: `${BASE_URL}/profile`,
    movie: `${BASE_URL}/movie`,
  },
};
