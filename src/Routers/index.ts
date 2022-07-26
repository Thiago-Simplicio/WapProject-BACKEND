import { Router, Request, Response } from 'express';

import { UsersController } from '../Controllers/UsersController';
import { PlansController } from '../Controllers/PlansController';
import { OrdersController } from '../Controllers/OrdersController';
import { LoginController } from '../Controllers/LoginController';

const user = new UsersController();
const plans = new PlansController();
const order = new OrdersController();
const login = new LoginController();

class Routers {
    public express: Router;

    public constructor () {
        this.express = Router()
        
        this.routesUser();
        this.routePlans();
        this.routeOrders();
        this.routeLogin();
    }

    private routesUser () {
        this.express.get('/users', user.getAllUser);
        this.express.post('/create', user.createUser);
        this.express.get('/get/:idUser', user.listUser);
        this.express.put('/update', user.updateUser);
        this.express.delete('/delete', user.deleteUser);
        this.express.get('/plans-user/:idUser', user.orderUser);
    }

    private routePlans () {
        this.express.get(`/plans`, plans.getAllPlans);
        this.express.post(`/create-plan`, plans.createPlans);
        this.express.get(`/get-plan/:idPlan`, plans.listPlans);
        this.express.put(`/update-plan`, plans.updatePlans);
        this.express.delete(`/delete-plan`, plans.deletePlans);
    }

    private routeOrders () {
        this.express.get(`/orders`, order.getAllOrder);
        this.express.post(`/create-order`, order.createOrder);
        this.express.get(`/get-order/:idOrder`, order.listOrder);
        this.express.put(`/update-order`, order.updateOrder);
        this.express.delete(`/delete-order`, order.deleteOrder);
    }

    private routeLogin () {
        this.express.post('/login', login.handle);
    }
}

export default new Routers().express