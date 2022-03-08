import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import { RoleCode } from '../../../database/model/Role';
import role from '../../../helpers/role';
import authorization from '../../../auth/authorization';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import DepartementRepo from '../../../database/repository/DepartementRepo';
import Department from '../../../database/model/Department';
import User from '../../../database/model/User';
import { Types } from 'mongoose';


const router = express.Router();


/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Admin role
router.use('/', authentication, role(RoleCode.ADMIN), authorization);
/*-------------------------------------------------------------------------*/



router.post(
  '/create',
  validator(schema.insert),
  asyncHandler(async (req: ProtectedRequest, res) => {

    // initialize request
    req.body.from = req.user as User;
    
    const dep = await DepartementRepo.create(req.body as Department);
    new SuccessResponse('created', dep).send(res);
  }),
);



router.get(
  '/network/:id',
  validator(schema.identifier, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {

    const departements = await DepartementRepo.findByNetwork(new Types.ObjectId(req.params.id));
    new SuccessResponse('retreived', departements).send(res);
  }),
);



router.delete(
  '/remove/:id',
  validator(schema.identifier, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const remove_ = await DepartementRepo.remove(new Types.ObjectId(req.params.id));
    new SuccessResponse('removed', remove_).send(res);
  }),
);


export default router;
