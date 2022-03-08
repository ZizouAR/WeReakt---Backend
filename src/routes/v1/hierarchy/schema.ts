import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';



export default {
  update: Joi.object().keys({
    hierarchy: Joi.string().required()
  }),
  identifier: Joi.object().keys({
    id: JoiObjectId().required()
  }),
};
