import { Request } from 'express';
import User from '../database/model/User';
import Keystore from '../database/model/Keystore';
import Attachement from '../database/model/Attachement';

declare interface PublicRequest extends Request {
  file?: Attachement
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  user: User;
  accessToken: string;
  keystore: Keystore;
}

declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
