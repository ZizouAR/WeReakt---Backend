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
import MeetingRepo from '../../../database/repository/MeetingRepo';
import Meeting from '../../../database/model/Meeting';
import { Types } from 'mongoose';
import User from '../../../database/model/User';
import { ForbiddenError } from '../../../core/ApiError';


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

    req.body.createdBy = req.user as User;
    const meeting = await MeetingRepo.create(req.body as Meeting);
    new SuccessResponse('created', meeting).send(res);
  }),
);




router.put(
  '/r/update',
  validator(schema.insert),
  validator(schema.identifier),
  asyncHandler(async (req: ProtectedRequest, res) => {
    
    // only creator has permission to update
    if(!(await MeetingRepo.isCreator(req.user, req.body.id))) throw new ForbiddenError();

    const meetings = await MeetingRepo.update(req.body as Meeting);
    new SuccessResponse('updated', meetings).send(res);
  }),
);



router.get(
  '/',
  asyncHandler(async (req: ProtectedRequest, res) => {

    const meetings = await MeetingRepo.findRecent(req.user as User);
    new SuccessResponse('retreived', meetings).send(res);
  }),
);



router.delete(
  '/r/remove/:id',
  validator(schema.identifier, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const meeting = await MeetingRepo.remove(new Types.ObjectId(req.params.id));
    new SuccessResponse('removed', meeting).send(res);
  }),
);


export default router;
