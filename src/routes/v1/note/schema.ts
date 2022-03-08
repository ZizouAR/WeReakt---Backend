import Joi from '@hapi/joi';
import { NoteType } from '../../../database/model/Note';
import { JoiObjectId } from '../../../helpers/validator';



export default {
  insert: Joi.object().keys({
    title: Joi.string().required().min(6).max(100),
    description: Joi.string().required().min(6).max(1000),
    departement: JoiObjectId().optional(),
    type: Joi.string().valid(...Object.values(NoteType)).required()
  }),
  identifier: Joi.object().keys({
    id: JoiObjectId().required()
  })
};
