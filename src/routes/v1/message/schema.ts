import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';


export default {
  insert: Joi.object().keys({
    message: Joi.string().required().max(1000),
    receiver: JoiObjectId().required()
  }),
  delete: Joi.object().keys({
    message_id: JoiObjectId().optional(), // delete message
    receiver: JoiObjectId().optional() // delete chat
  })
};
