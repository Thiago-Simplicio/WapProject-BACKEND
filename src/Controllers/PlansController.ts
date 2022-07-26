import { Request, Response } from 'express';
import { PlansServices } from "../Services/PlansServices";

class PlansController {
    public async getAllPlans (req: Request, res: Response) {
        try {
            const plansServices = new PlansServices();

            const execute = await plansServices.get();

            return res.status(200).json(execute);
        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`})
        }
    }

    public async createPlans (req: Request, res: Response) {
        try {
            const {name_plan, description_plan, value_plan} = req.body;

            const plansServices = new PlansServices();

            const execute = await plansServices.create(name_plan,description_plan,value_plan);

            return res.status(200).json(execute);
        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }

    public async listPlans (req: Request, res: Response) {
        try {
            const {idPlan} = req.params;

            const plansServices = new PlansServices();

            const execute = await plansServices.list(idPlan);

            return res.status(200).json(execute);
        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }

    public async updatePlans (req: Request, res: Response) {
        try {
            const {idPlan} = req.query;

            const {name_plan, description_plan, value_plan} = req.body;

            const plansServices = new PlansServices();

            const execute = await plansServices.update(idPlan, name_plan, description_plan, value_plan);

            return res.status(200).json(execute);
        } catch (err) {
            return res.status(400).json({msg: `Erro no servidor ${err}`});
        }
    }

    public async deletePlans (req: Request, res: Response) {
        try {
            const {idPlan} = req.query;

            const plansServices = new PlansServices();

            const execute = await plansServices.delete(idPlan);

            return res.status(200).json(execute);
        } catch (err) { 
            return res.status(200).json({msg: `Erro no servidor ${err}`});
        }
    }
}

export { PlansController }