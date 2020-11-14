import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/routes/user.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import productsCategoryRouter from '@modules/products/infra/http/routes/productsCategory.routes';
import lookStylesRouter from '@modules/looks/infra/http/routes/lookStyles.routes';
import ordersRouter from '@modules/orders/infra/http/routes/orders.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/products', productsRouter);
routes.use('/category', productsCategoryRouter);
routes.use('/looks', lookStylesRouter);
routes.use('/orders', ordersRouter);

export default routes;
