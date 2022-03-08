import Joi from '@hapi/joi';
import { MeetingStatus } from '../../../database/model/Meeting';
import { JoiObjectId } from '../../../helpers/validator';



export default {
  insert: Joi.object().keys({
    title: Joi.string().required().min(6).max(100),
    datetime: Joi.date().required(),
    duration: Joi.number().required().min(5).max(480),
    guests: Joi.array().required(),
    status: Joi.string().valid(...Object.values(MeetingStatus)).optional(),
  }),
  identifier: Joi.object().keys({
    id: JoiObjectId().required()
  }),
};
