import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ProductsController from '../controllers/ProductsController';
import ProductsByCategoryNameController from '../controllers/ProductsByCategoryNameController';
import ProductsImageController from '../controllers/ProductsImageController';

const productsRouter = Router();
const productsController = new ProductsController();
const productsByCategoryNameController = new ProductsByCategoryNameController();
const productsImageController = new ProductsImageController();

const upload = multer(uploadConfig.multer);

productsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      color: Joi.string().required(),
      size: Joi.string().required(),
      brand: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      gender: Joi.string().required(),
      category_id: Joi.string().required(),
    },
  }),
  productsController.create
);

productsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().uuid().required(),
      name: Joi.string().required(),
      color: Joi.string().required(),
      size: Joi.string().required(),
      brand: Joi.string().required(),
      price: Joi.number().required(),
      description: Joi.string().required(),
      gender: Joi.string().required(),
      category_id: Joi.string().required(),
    },
  }),
  productsController.update
);

productsRouter.get('/', productsController.index);

productsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  productsController.show
);

productsRouter.get(
  '/cat/:category_name',
  celebrate({
    [Segments.PARAMS]: {
      category_name: Joi.string().required(),
    },
  }),
  productsByCategoryNameController.index
);

productsRouter.patch(
  '/image',
  upload.single('image'),
  productsImageController.update
);

export default productsRouter;
