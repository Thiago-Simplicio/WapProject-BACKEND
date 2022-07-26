import { Request, Response } from 'express';

import { UsersServices } from '../Services/UsersServices';

class UsersController {
    public async getAllUser (req: Request, res: Response) {
        try {
            const userServices = new UsersServices();
    
            const execute = await userServices.get();

            return res.status(200).json(execute);

        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }

    public async createUser (req: Request, res: Response) {
        try {
            const { email_user, name_user } = req.body;

            const userServices = new UsersServices();

            const execute = await userServices.create(email_user, name_user);

            return res.status(200).json(execute);

        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }

    public async listUser (req: Request, res: Response) {
        try {
            const { idUser } = req.params;

            const userServices = new UsersServices();

            const execute = await userServices.list(idUser);

            return res.status(200).json(execute);
        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }

    public async updateUser (req: Request, res: Response) {
        try {
            const { idUser } = req.query;
            const { email_user, name_user } = req.body;

            const userServices = new UsersServices();

            const execute = await userServices.update(idUser, email_user, name_user);

            return res.status(200).json(execute);
        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }

    public async deleteUser (req: Request, res: Response) {
        try {
            const {idUser} = req.query;

            const userServices = new UsersServices();

            const execute = await userServices.delete(idUser);

            return res.status(200).json(execute);
        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }

    public async orderUser (req: Request, res: Response) {
        try {
            const {idUser} = req.params;

            const userServices = new UsersServices();

            const execute = await userServices.getPlansUser(idUser);

            return res.status(200).json(execute);
        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }
}

export { UsersController }