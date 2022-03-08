import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { BadRequestError, ForbiddenError, NotFoundError } from '../../../core/ApiError';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import GroupRepo from '../../../database/repository/GroupRepo';
import Group from '../../../database/model/Group';
import User from '../../../database/model/User';


const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for writer's role
router.use('/', authentication);
/*-------------------------------------------------------------------------*/



router.post(
  '/create',
  validator(schema.insert),
  asyncHandler(async (req: ProtectedRequest, res) => {

    // initialize request
    req.body.createdBy = req.user;
    req.body.members = [] as User[];

    const grp = await GroupRepo.create(req.body as Group);
    new SuccessResponse('created', grp).send(res);
  }),
);




router.post(
  '/accept',
  validator(schema.identifier),
  asyncHandler(async (req: ProtectedRequest, res) => {

    // do exist
    const group = await GroupRepo.isGroupChat(req.body.id);
    if(!group) throw new NotFoundError();

    // accept invite
    group.members.push(req.user);
    const grp = GroupRepo.update(req.body as Group);
    new SuccessResponse('accepted', grp).send(res);
  }),
);



router.get(
  '/',
  asyncHandler(async (req: ProtectedRequest, res) => {

    const groups = await GroupRepo.find(req.user);
    new SuccessResponse('retreived', groups).send(res);
  }),
);



router.delete(
  '/id/:id',
  validator(schema.identifier, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {
    //....
  }),
);


export default router;
