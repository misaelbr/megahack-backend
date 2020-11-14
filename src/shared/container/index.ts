import { container } from 'tsyringe';

import './providers';
import '@modules/users/providers';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import IUserPreferencesRepository from '@modules/users/repositories/IUserPreferencesRepository';
import UserPreferencesRepository from '@modules/users/infra/typeorm/repositories/UserPreferencesRepository';

import IProductsCategoryRepository from '@modules/products/repositories/IProductsCategoryRepository';
import ProductsCategoryRepository from '@modules/products/infra/typeorm/repositories/ProductsCategoryRepository';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IProductsLookStylesRepository from '@modules/products/repositories/IProductsLookStylesRepository';
import ProductsLookStylesRepository from '@modules/products/infra/typeorm/repositories/ProductsLookStylesRepository';

import ILookStylesRepository from '@modules/looks/repositories/ILookStylesRepository';
import LookStylesRepository from '@modules/looks/infra/typeorm/repositories/LookStylesRepository';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import OrdersRepository from '@modules/orders/infra/typeorm/repositories/OrdersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<IUserPreferencesRepository>(
  'UserPreferencesRepository',
  UserPreferencesRepository
);

container.registerSingleton<IProductsCategoryRepository>(
  'ProductsCategoryRepository',
  ProductsCategoryRepository
);

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository
);

container.registerSingleton<IProductsLookStylesRepository>(
  'ProductsLookStylesRepository',
  ProductsLookStylesRepository
);

container.registerSingleton<ILookStylesRepository>(
  'LookStylesRepository',
  LookStylesRepository
);

container.registerSingleton<IOrdersRepository>(
  'OrdersRepository',
  OrdersRepository
);
