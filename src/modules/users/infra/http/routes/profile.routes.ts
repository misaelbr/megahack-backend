import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import ProfileController from '../controllers/ProfileController';
import UserPreferencesController from '../controllers/UserPreferencesController';

const profileRouter = Router();
const profileController = new ProfileController();

const userPreferencesController = new UserPreferencesController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      gender: Joi.string(),
      old_password: Joi.string(),
      password: Joi.string(),
      password_confirmation: Joi.string().valid(Joi.ref('password')),
    },
  }),
  profileController.update
);

profileRouter.put(
  '/preferences',
  celebrate({
    [Segments.BODY]: {
      favorite_color: Joi.string().required(),
      favorite_size: Joi.string().required(),
      look_styes_id: Joi.string().uuid().required(),
    },
  }),
  userPreferencesController.update
);

profileRouter.post(
  '/preferences',
  celebrate({
    [Segments.BODY]: {
      favorite_color: Joi.string().required(),
      favorite_size: Joi.string().required(),
      look_styes_id: Joi.string().uuid().required(),
    },
  }),
  userPreferencesController.create
);

profileRouter.get('/preferences', userPreferencesController.show);

export default profileRouter;
