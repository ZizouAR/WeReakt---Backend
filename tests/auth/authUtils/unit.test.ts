import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from './mock';
import { validateTokenData, createTokens } from '../../../src/auth/authUtils';
import { JwtPayload } from '../../../src/core/JWT';
import { TOKEN_INFO } from '../../../src/config';
import { Types } from 'mongoose';
import { AuthFailureError } from '../../../src/core/ApiError';
import User from '../../../src/database/model/User';

describe('authUtils validateTokenData tests', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('Should throw error when subject in not user id format', async () => {
    const payload = new JwtPayload(
      TOKEN_INFO.issuer,
      TOKEN_INFO.audience,
      'abc',
      ACCESS_TOKEN_KEY,
      TOKEN_INFO.accessTokenValidityDays,
    );

    try {
      validateTokenData(payload);
    } catch (e) {
      expect(e).toBeInstanceOf(AuthFailureError);
    }
  });

  it('Should throw error when access token key is different', async () => {
    const payload = new JwtPayload(
      TOKEN_INFO.issuer,
      TOKEN_INFO.audience,
      new Types.ObjectId().toHexString(),
      '123',
      TOKEN_INFO.accessTokenValidityDays,
    );

    try {
      validateTokenData(payload);
    } catch (e) {
      expect(e).toBeInstanceOf(AuthFailureError);
    }
  });

  it('Should return true if all data is correct', async () => {
    const payload = new JwtPayload(
      TOKEN_INFO.issuer,
      TOKEN_INFO.audience,
      new Types.ObjectId().toHexString(), // Random Key
      ACCESS_TOKEN_KEY,
      TOKEN_INFO.accessTokenValidityDays,
    );

    const validatedPayload = validateTokenData(payload);

    expect(validatedPayload).toBeTruthy();
  });
});

describe('authUtils createTokens function', () => {
  beforeAll(() => {
    jest.resetAllMocks();
  });

  it('Should process and return accessToken and refreshToken', async () => {
    const userId = new Types.ObjectId(); // Random Key

    const tokens = await createTokens({ _id: userId } as User, ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY);

    expect(tokens).toHaveProperty('accessToken');
    expect(tokens).toHaveProperty('refreshToken');
  });
});
