import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import LookStylesController from '../controllers/LookStylesController';
import LookStylesByNameController from '../controllers/LookStylesByNameController';

const lookStylesRouter = Router();

const lookStylesController = new LookStylesController();
const lookStylesByNameController = new LookStylesByNameController();

lookStylesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string(),
    },
  }),
  lookStylesController.create
);

lookStylesRouter.get('/', lookStylesController.index);

lookStylesRouter.get(
  '/:look_styles_id',
  celebrate({
    [Segments.PARAMS]: {
      look_styles_id: Joi.string().uuid().required(),
    },
  }),
  lookStylesController.show
);

lookStylesRouter.get(
  '/:name',
  celebrate({
    [Segments.PARAMS]: {
      name: Joi.string().required(),
    },
  }),
  lookStylesByNameController.show
);

export default lookStylesRouter;
