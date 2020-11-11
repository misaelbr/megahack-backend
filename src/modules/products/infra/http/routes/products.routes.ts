import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProductsController from '../controllers/ProductsController';
import ProductsByCategoryNameController from '../controllers/ProductsByCategoryNameController';

const productsRouter = Router();
const productsController = new ProductsController();
const productsByCategoryNameController = new ProductsByCategoryNameController();

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

export default productsRouter;
