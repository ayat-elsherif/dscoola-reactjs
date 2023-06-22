const dev = {
  API_ENDPOINT_URL: 'https://staging-api.dscoola.com/',
};

const prod = {
  API_ENDPOINT_URL: 'https://staging-api.dscoola.com/',
};

const test = {
  API_ENDPOINT_URL: 'https://staging-api.dscoola.com/',
};

const getEnv = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return dev;
    case 'production':
      return prod;
    case 'test':
      return test;
    default:
      break;
  }
};

export const env = getEnv();
