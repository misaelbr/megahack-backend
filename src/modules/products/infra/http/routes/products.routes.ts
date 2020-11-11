import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();
const productsController = new ProductsController();

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

export default productsRouter;
