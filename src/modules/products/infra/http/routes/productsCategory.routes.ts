import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProductsCategoryController from '../controllers/ProductsCategoryController';

const productsCategoryRouter = Router();
const productsCategoryController = new ProductsCategoryController();

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

export default productsCategoryRouter;
