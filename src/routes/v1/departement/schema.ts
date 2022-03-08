import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';



export default {
  insert: Joi.object().keys({
    name: Joi.string().required().min(6).max(100),
    network: JoiObjectId().required()
  }),
  identifier: Joi.object().keys({
    id: JoiObjectId().required()
  }),
};
