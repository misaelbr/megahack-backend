import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.body;

      const orderService = container.resolve(FindOrderService);

      const order = await orderService.execute({ id });

      return response.json(order);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id, products } = request.body;

      const createOrderService = container.resolve(CreateOrderService);

      const order = await createOrderService.execute({ user_id, products });

      return response.json(order);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
