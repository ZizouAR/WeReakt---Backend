import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { BadRequestError, ForbiddenError } from '../../../core/ApiError';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import TaskRepo from '../../../database/repository/TaskRepo';
import Task from '../../../database/model/Task';
import User from '../../../database/model/User';
import role from '../../../helpers/role';
import { RoleCode } from '../../../database/model/Role';
import authorization from '../../../auth/authorization';


const router = express.Router();

/*-------------------------------------------------------------------------*/
// private APIs protected for Admin role
router.use('/', authentication);
// protected APIs
router.use('/r', role(RoleCode.ADMIN), authorization);
/*-------------------------------------------------------------------------*/



router.post(
  '/r/create',
  validator(schema.insert),
  asyncHandler(async (req: ProtectedRequest, res) => {

    // initialize request
    req.body.from = req.user as User;
    
    const task = await TaskRepo.create(req.body as Task);
    new SuccessResponse('created', task).send(res);
  }),
);




router.post(
  '/r/update',
  validator(schema.update),
  asyncHandler(async (req: ProtectedRequest, res) => {

      const task = await TaskRepo.updateStatus(req.body as Task);
      new SuccessResponse('updated', task).send(res);
  }),
);



router.get(
  '/',
  asyncHandler(async (req: ProtectedRequest, res) => {

    const tasks = await TaskRepo.find(req.user);
    new SuccessResponse('retreived', tasks).send(res);
  }),
);



router.delete(
  '/r/id/:id',
  validator(schema.delete, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {
    //....
  }),
);


export default router;
