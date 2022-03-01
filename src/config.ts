// Mapper for environment variables
export const environment = process.env.NODE_ENV;
export const port = process.env.PORT;


export const db = {
  uri: process.env.DB_URI || '',
  name: process.env.DB_NAME || '',
  host: process.env.DB_HOST || '',
  port: process.env.DB_PORT || '',
  user: process.env.DB_USER || '',
  password: process.env.DB_USER_PWD || '',
};


export const CORS_URL = process.env.CORS_URL;
export const UPLOAD_SIZE_LIMIT = process.env.UPLOAD_SIZE_LIMIT;


export const TOKEN_INFO = {
  accessTokenValidityDays: parseInt(process.env.ACCESS_TOKEN_VALIDITY_SEC || '0'),
  refreshTokenValidityDays: parseInt(process.env.REFRESH_TOKEN_VALIDITY_SEC || '0'),
  issuer: process.env.TOKEN_ISSUER || '',
  audience: process.env.TOKEN_AUDIENCE || '',
};

export const LOG_DIR = process.env.LOG_DIR;
