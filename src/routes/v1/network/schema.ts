import Joi from '@hapi/joi';
import { ANNUEL_REVENUE, EMPLOYEES_NUM, INDUSTRIES } from '../../../database/model/Network';
import { JoiObjectId } from '../../../helpers/validator';



export default {
  insert: Joi.object().keys({
    name: Joi.string().required().min(6).max(100),
    industry: Joi.string().valid(...Object.values(INDUSTRIES)).required(),
    annual_revenue: Joi.string().valid(...Object.values(ANNUEL_REVENUE)).optional(),
    employees_num: Joi.string().valid(...Object.values(EMPLOYEES_NUM)).optional(),
  }),
  identifier: Joi.object().keys({
    id: JoiObjectId().required()
  })
};
