import { Request, Response } from 'express';

import { LoginServices } from '../Services/LoginServices';

class LoginController {
    public async handle (req: Request, res: Response) {
        try {
            const { email_user } = req.body;

            const loginServices = new LoginServices();

            const execute = await loginServices.login(email_user);

            return res.status(200).json(execute);
        } catch (err) {
            return res.status(400).json({ msg: `Erro no servidor ${err}` })
        }
    }
}

export { LoginController };