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
import JobRepo from '../../../database/repository/JobRepo';
import Job from '../../../database/model/Job';
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
    
    const job = await JobRepo.create(req.body as Job);
    new SuccessResponse('created', job).send(res);
  }),
);



router.get(
  '/departement/:id',
  validator(schema.identifier, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {

    const jobs = await JobRepo.findByDepartement(new Types.ObjectId(req.params.id));
    new SuccessResponse('retreived', jobs).send(res);
  }),
);


router.get(
  '/network/:id',
  validator(schema.identifier, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {

    const jobs = await JobRepo.findByNetwork(new Types.ObjectId(req.params.id));
    new SuccessResponse('retreived', jobs).send(res);
  }),
);



router.delete(
  '/remove/:id',
  validator(schema.identifier, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const job = await JobRepo.remove(new Types.ObjectId(req.params.id));
    new SuccessResponse('removed', job).send(res);
  }),
);


export default router;
