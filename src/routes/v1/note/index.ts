import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import { RoleCode } from '../../../database/model/Role';
import authorization from '../../../auth/authorization';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import NoteRepo from '../../../database/repository/NoteRepo';
import Note from '../../../database/model/Note';
import User from '../../../database/model/User';
import { Types } from 'mongoose';
import role from '../../../helpers/role';
import JobRepo from '../../../database/repository/JobRepo';
import Job from '../../../database/model/Job';
import Network from '../../../database/model/Network';
import Departement from '../../../database/model/Department';
import upload from '../../../helpers/uploadHandler';
import Attachement, { AttachementAs } from '../../../database/model/Attachement';
import AttachementRepo from '../../../database/repository/AttachementRepo';
import Logger from '../../../core/Logger';


const router = express.Router();

 
/*-------------------------------------------------------------------------*/
// private APIs protected for Admin role
router.use('/', authentication);
// protected APIs
router.use('/r', role(RoleCode.ADMIN), authorization);
/*-------------------------------------------------------------------------*/



router.post(
  '/r/create',
  upload.single('attachement'),
  validator(schema.insert),
  asyncHandler(async (req: ProtectedRequest, res) => {
    
    // initialize request
    req.body.createdBy = req.user as User;
    Logger.info(req.user);

    req.body.network = req.user.network;

    let attachement = req.file;
    if(req.body.departement) req.body.private = true;


    // upload
    if(attachement) {
      attachement.user = req.user  
      attachement.as = AttachementAs.NOTE;
      req.body.attachement = await AttachementRepo.upload(attachement as Attachement)
    }

    const note = await NoteRepo.create(req.body as Note);
    new SuccessResponse('created', note).send(res);
  }),
);



router.get(
  '/',
  asyncHandler(async (req: ProtectedRequest, res) => {

    // get job information
    const job = await JobRepo.findById(req.user.job as Job);
    // get recent public and private notes
    const open = await NoteRepo.findRecentByNetwork(req.user.network as Network); // public
    const closed = await NoteRepo.findRecentByDepartement(job?.departement as Departement); // private

    // concat arrays
    open.push(...closed);

    new SuccessResponse('retreived', open).send(res);
  }),
);



router.delete(
  '/r/delete/:id',
  validator(schema.identifier, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {

    const note = await NoteRepo.remove(new Types.ObjectId(req.params.id));
    new SuccessResponse('deleted', note).send(res);
  }),
);

export default router;
