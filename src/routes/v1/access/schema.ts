import Joi from '@hapi/joi';
import { JoiAuthBearer } from '../../../helpers/validator';

export default {
  userCredential: Joi.object().keys({
    //email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    tel: Joi.string().required().length(10)
  }),
  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  signup: Joi.object().keys({
    firstname: Joi.string().required().min(3),
    lastname: Joi.string().required().min(3),
    //email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
    picture: Joi.string().optional().uri(),
    tel: Joi.string().required().length(10).pattern(/^[0-9]+$/).messages({'string.pattern.base': `Phone number must have 10 digits.`})
  }),
};
