import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import { RoleRequest } from 'app-request';
import crypto from 'crypto';
import UserRepo from '../../../database/repository/UserRepo';
import AttachementRepo from '../../../database/repository/AttachementRepo';
import { BadRequestError, NotFoundError } from '../../../core/ApiError';
import User from '../../../database/model/User';
import { AttachementAs } from '../../../database/model/Attachement';
import { createTokens } from '../../../auth/authUtils';
import validator from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import bcrypt from 'bcrypt';
import _ from 'lodash';
import { RoleCode } from '../../../database/model/Role';
import upload from '../../../helpers/uploadHandler';
import JobRepo from '../../../database/repository/JobRepo';


const router = express.Router();

router.post(
  '/basic', upload.single('avatar'),
  validator(schema.signup),
  asyncHandler(async (req: RoleRequest, res) => {


    // @CAST USER
    const USER = req.body as User;

    const attachement = req.file;
    const user = await UserRepo.findByPhone(USER.tel);
    if (user) throw new BadRequestError('User already registered');
    if(!(await JobRepo.findById(req.body.job))) throw new NotFoundError("Job not found");


    const accessTokenKey = crypto.randomBytes(64).toString('hex');
    const refreshTokenKey = crypto.randomBytes(64).toString('hex');
    USER.password = await bcrypt.hash(USER.password, 10);
 

    const { user: createdUser, keystore } = await UserRepo.create(
      USER,
      accessTokenKey,
      refreshTokenKey,
      RoleCode.ADMIN,
    );
    
    
    // @ATTACHEMENT
    if(attachement){
      attachement.user = createdUser._id;    
      attachement.as = AttachementAs.PROFILE;

      // @SET PROFILE_PIC
      createdUser.picture = await AttachementRepo.upload(attachement)
      await UserRepo.updateInfo(createdUser);
    }


    const tokens = await createTokens(createdUser, keystore.primaryKey, keystore.secondaryKey);
    new SuccessResponse('Signup Successful', {
      user: _.pick(createdUser, ['_id', 'name', 'tel', 'roles', 'picture']),
      tokens: tokens,
    }).send(res);
  }),
);

export default router;
