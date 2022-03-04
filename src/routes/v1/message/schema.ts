import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';



export default {
  message: Joi.object().keys({
    message: Joi.string().required().max(1000),
    receiver: JoiObjectId().required(),
    //isGroupeChat: Joi.boolean().required(),
    //hasAttachement: Joi.boolean().required()
  })
};
