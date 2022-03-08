import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';



export default {
  insert: Joi.object().keys({
    title: Joi.string().required().min(6).max(100),
    description: Joi.string().required().min(6).max(400),
    departement: JoiObjectId().required(),
  }),
  identifier: Joi.object().keys({
    id: JoiObjectId().required()
  }),
};
