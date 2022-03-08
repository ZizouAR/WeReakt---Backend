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
import HierarchyRepo from '../../../database/repository/HierarchyRepo';
import Hierarchy from '../../../database/model/Hierarchy';
import { Types } from 'mongoose';
import { NotFoundError } from '../../../core/ApiError';


const router = express.Router();


/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for Admin role
router.use('/', authentication, role(RoleCode.ADMIN), authorization);
/*-------------------------------------------------------------------------*/



router.post(
  '/update',
  validator(schema.update, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {

    req.body.updatedBy = req.user;
    const hierarchy = await HierarchyRepo.update(req.body as Hierarchy);
    new SuccessResponse('retreived', hierarchy).send(res);
  }),
);


router.get(
  '/network/:id',
  validator(schema.identifier, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {

    const hierarchy = await HierarchyRepo.findByNetwork(new Types.ObjectId(req.params.id));
    if(!hierarchy) throw new NotFoundError();

    new SuccessResponse('retreived', hierarchy).send(res);
  }),
);




export default router;
