import express from 'express';
import { SuccessResponse } from '../../../core/ApiResponse';
import { ProtectedRequest } from 'app-request';
import { BadRequestError, ForbiddenError } from '../../../core/ApiError';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import asyncHandler from '../../../helpers/asyncHandler';
import authentication from '../../../auth/authentication';
import MessageRepo from '../../../database/repository/MessageRepo';
import Message from '../../../database/model/Message';
import GroupRepo from '../../../database/repository/GroupRepo';
import upload from '../../../helpers/uploadHandler';
import Attachement, { AttachementAs } from '../../../database/model/Attachement';
import AttachementRepo from '../../../database/repository/AttachementRepo';


const router = express.Router();

/*-------------------------------------------------------------------------*/
// Below all APIs are private APIs protected for writer's role
router.use('/', authentication);
/*-------------------------------------------------------------------------*/


router.post(
  '/send',
  upload.single('attachement'),
  validator(schema.insert),
  asyncHandler(async (req: ProtectedRequest, res) => {

    // set user and attachement
    req.body.sender = req.user;
    let attachement = req.file;

    // upload 
    if(attachement){
      req.body.hasAttachement = true;
      attachement.user = req.user  
      attachement.as = AttachementAs.MESSAGE;
      req.body.attachement = await AttachementRepo.upload(attachement as Attachement)
    }

    // create message
    req.body as Message;
    if(!req.body.hasAttachement && req.body.message.trim().length < 1)
     throw new BadRequestError();

     // is a group chat / is a member
    req.body.isGroupChat = await GroupRepo.isGroupChat(req.body.receiver);
    if(req.body.isGroupChat && !(GroupRepo.isMember(req.body.isGroupChat, req.body.sender)))
     throw new ForbiddenError();

     // return res
    const msg = await MessageRepo.create(req.body as Message);
    new SuccessResponse('sent', msg).send(res);
  }),
);




router.post(
  '/read',
  validator(schema.insert),
  asyncHandler(async (req: ProtectedRequest, res) => {

    const messages = await MessageRepo.read(req.user, req.body.user);
    new SuccessResponse('retreived', messages).send(res);
  }),
);




router.delete(
  '/id/:id',
  validator(schema.delete, ValidationSource.PARAM),
  asyncHandler(async (req: ProtectedRequest, res) => {
    //....
  }),
);


export default router;
