import { USER_ID } from '../../../auth/authentication/mock';
import Keystore from '../../../../src/database/model/Keystore';
import User from '../../../../src/database/model/User';
import { Types } from 'mongoose';
import bcrypt from 'bcrypt';
import * as authUtils from '../../../../src/auth/authUtils';
import Role from '../../../../src/database/model/Role';

export const USER_TEL = parseInt("0540613456");
export const USER_PASSWORD = 'abc123';
export const USER_PASSWORD_HASH = bcrypt.hashSync(USER_PASSWORD, 10);

export const createTokensSpy = jest.spyOn(authUtils, 'createTokens');

export const bcryptCompareSpy = jest.spyOn(bcrypt, 'compare');

export const mockKeystoreCreate = jest.fn(
  async (client: User, primaryKey: string, secondaryKey: string): Promise<Keystore> => {
    return {
      _id: new Types.ObjectId(),
      client: client,
      primaryKey: primaryKey,
      secondaryKey: secondaryKey,
    } as Keystore;
  },
);

export const mockUserFindByEmail = jest.fn(
  async (tel: number): Promise<User | null> => {
    if (tel === USER_TEL)
      return {
        _id: USER_ID,
        tel: USER_TEL,
        password: USER_PASSWORD_HASH,
        name: 'abc',
        roles: [] as Role[],
      };
    return null;
  },
);

jest.mock('../../../../src/database/repository/KeystoreRepo', () => ({
  get create() {
    return mockKeystoreCreate;
  },
}));

jest.mock('../../../../src/database/repository/UserRepo', () => ({
  get findByEmail() {
    return mockUserFindByEmail;
  },
}));

jest.unmock('../../../../src/auth/authUtils'); // remove any override made anywhere
