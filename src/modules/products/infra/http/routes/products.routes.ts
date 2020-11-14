import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ProductsController from '../controllers/ProductsController';
import ProductsByGenderController from '../controllers/ProductsByGenderController';
import ProductsByCategoryNameController from '../controllers/ProductsByCategoryNameController';
import ProductsByCategoryNameAndGenderController from '../controllers/ProductsByCategoryNameAndGenderController';
import ProductsImageController from '../controllers/ProductsImageController';
import ProductsLookStylesController from '../controllers/ProductsLooksStylesController';

const productsRouter = Router();
const productsController = new ProductsController();
const productsByGenderController = new ProductsByGenderController();
const productsByCategoryNameController = new ProductsByCategoryNameController();
const productsImageController = new ProductsImageController();
const productsByCategoryNameAndGenderController = new ProductsByCategoryNameAndGenderController();
const productsLookStylesController = new ProductsLookStylesController();

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
      quantity: Joi.number().required(),
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
      quantity: Joi.number().required(),
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

productsRouter.get(
  '/cat/:category_name/:gender',
  celebrate({
    [Segments.PARAMS]: {
      category_name: Joi.string().required(),
      gender: Joi.string().required(),
    },
  }),
  productsByCategoryNameAndGenderController.index
);

productsRouter.get(
  '/gender/:gender',
  celebrate({
    [Segments.PARAMS]: {
      gender: Joi.string().required(),
    },
  }),
  productsByGenderController.index
);

productsRouter.patch(
  '/image',
  upload.single('image'),
  productsImageController.update
);

productsRouter.get(
  '/look/:look_styles_id',
  celebrate({
    [Segments.PARAMS]: {
      look_styles_id: Joi.string().uuid().required(),
    },
  }),
  productsLookStylesController.show
);

productsRouter.get(
  '/look/product/:product_id',
  celebrate({
    [Segments.PARAMS]: {
      product_id: Joi.string().uuid().required(),
    },
  }),
  productsLookStylesController.read
);

productsRouter.post(
  '/look',
  celebrate({
    [Segments.BODY]: {
      product_id: Joi.string().uuid().required(),
      look_styles_id: Joi.string().uuid().required(),
    },
  }),
  productsLookStylesController.create
);

export default productsRouter;
