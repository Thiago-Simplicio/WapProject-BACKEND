import { Request, Response } from 'express';

import { OrdersServices } from '../Services/OrdersServices';

class OrdersController {
    public async getAllOrder (req: Request, res: Response) {
        try {
            const ordersServices = new OrdersServices();
    
            const execute = await ordersServices.get();

            return res.status(200).json(execute);

        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }

    public async createOrder (req: Request, res: Response) {
        try {
            const { subscribe_id, plans_id } = req.body;

            const ordersServices = new OrdersServices();

            const execute = await ordersServices.create(subscribe_id, plans_id);

            return res.status(200).json(execute);

        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }

    public async listOrder (req: Request, res: Response) {
        try {
            const { idOrder } = req.params;

            const ordersServices = new OrdersServices();

            const execute = await ordersServices.list(idOrder);

            return res.status(200).json(execute);
        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }

    public async updateOrder (req: Request, res: Response) {
        try {
            const { idOrder } = req.query;
            const { subscribe_id, plans_id } = req.body;

            const ordersServices = new OrdersServices();

            const execute = await ordersServices.update(idOrder, subscribe_id, plans_id);

            return res.status(200).json(execute);
        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }

    public async deleteOrder (req: Request, res: Response) {
        try {
            const {idOrder} = req.query;

            const ordersServices = new OrdersServices();

            const execute = await ordersServices.delete(idOrder);

            return res.status(200).json(execute);
        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }
}

export { OrdersController }