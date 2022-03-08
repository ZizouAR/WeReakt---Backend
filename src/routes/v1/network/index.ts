import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import { RoleCode } from '../../../database/model/Role';
import authorization from '../../../auth/authorization';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import NetworkRepo from '../../../database/repository/NetworkRepo';
import Network from '../../../database/model/Network';
import User from '../../../database/model/User';
import { Types } from 'mongoose';
import role from '../../../helpers/role';


const router = express.Router();

 
/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for writer's role
router.use('/', authentication, role(RoleCode.OWNER), authorization);
/*-------------------------------------------------------------------------*/



router.post(
  '/create',
  validator(schema.insert),
  asyncHandler(async (req: ProtectedRequest, res) => {

    // initialize request
    req.body.createdBy = req.user as User;

    const network = await NetworkRepo.create(req.body as Network);
    new SuccessResponse('created', network).send(res);
  }),
);



router.get(
  '/:id',
  validator(schema.identifier, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {

    const network = await NetworkRepo.find(new Types.ObjectId(req.params.id));
    new SuccessResponse('retreived', network).send(res);
  }),
);


export default router;
