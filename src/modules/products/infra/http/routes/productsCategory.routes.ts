import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ProductsCategoryController from '../controllers/ProductsCategoryController';
import ProductsCategoryImageController from '../controllers/ProductsCategoryImageController';

const productsCategoryRouter = Router();
const productsCategoryController = new ProductsCategoryController();
const productsCategoryImageController = new ProductsCategoryImageController();

const upload = multer(uploadConfig.multer);

productsCategoryRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  productsCategoryController.create
);

productsCategoryRouter.get('/', productsCategoryController.index);

productsCategoryRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      description: Joi.string().required(),
    },
  }),
  productsCategoryController.update
);

productsCategoryRouter.patch(
  '/image',
  upload.single('image'),
  productsCategoryImageController.update
);

export default productsCategoryRouter;
