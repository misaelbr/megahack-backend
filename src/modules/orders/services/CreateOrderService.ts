import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import Order from '../infra/typeorm/entities/Order';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  user_id: string;
  products: IProduct[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  public async execute({ user_id, products }: IRequest): Promise<Order> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User id not found!', 400);
    }

    const productsData = await this.productsRepository.findAllById(
      products.map(product => ({ id: product.id }))
    );

    const productsList = products.map(product => {
      const existProduct = productsData.find(
        productData => productData.id === product.id
      );

      if (!existProduct) {
        throw new AppError('Product does not exist', 400);
      }

      if (product.quantity > existProduct.quantity) {
        throw new AppError(
          `Product quantity is higher than the available. ${existProduct.name}`
        );
      }

      return {
        ...product,
        price: existProduct.price,
      };
    });

    const productsOrder = productsList.map(product => {
      return {
        product_id: product.id,
        price: product.price,
        quantity: product.quantity,
      };
    });

    const order = await this.ordersRepository.create({
      user,
      products: productsOrder,
    });

    const updateProductsQuantity = productsData.map(productUpdate => {
      const productIndex = products.findIndex(
        findIndexProduct => findIndexProduct.id === productUpdate.id
      );

      const productQuantity = {
        id: productUpdate.id,
        quantity: productUpdate.quantity - products[productIndex].quantity,
      };

      return productQuantity;
    });

    await this.productsRepository.updateQuantity(updateProductsQuantity);

    return order;
  }
}

export default CreateOrderService;
