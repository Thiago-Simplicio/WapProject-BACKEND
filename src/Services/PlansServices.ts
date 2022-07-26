import PlansSchema from "../Models/PlansSchema";

class PlansServices {
    public async get () {
        const plan = await PlansSchema.find();
        if (plan.length > 0) {
            return (plan)
        } else {
            return ({
                msg: `Nenhum plano cadastrado ainda!`
            })
        }
    }

    public async create (name_plan: any, description_plan: any, value_plan: any) {
        if (name_plan && value_plan) {
            let data = {name_plan, description_plan, value_plan};
            const plan = await PlansSchema.create(data);
            return ({
                plan
            });
        } else {
            return ({
                msg: `Nome e valor do plano são obrigátorios!`
            })
        }
    }

    public async list (idPlan: any) {
        if (idPlan) {
            const plan = await PlansSchema.findOne({_id: idPlan});
            if (plan) {
                return ({
                    plan
                })
            } else {
                return ({
                    msg: `Plano não encontrado!`,
                    status: 2
                })
            }
        } else {
            return ({
                msg: `Digite o id do plano`,
                status: 3
            })
        }
    }

    public async update (idPlan: any, name_plan: any, description_plan: any, value_plan: any) {
        if (idPlan) {
            const plan = await PlansSchema.findOne({_id: idPlan});
            if (plan) {
                if (name_plan || description_plan || value_plan) {
                    let data = {name_plan, description_plan, value_plan};
                    const newPlan = await PlansSchema.findOneAndUpdate({_id: idPlan}, data, {new: true});
                    return ({
                        newPlan
                    })
                }
                return ({
                    msg: `Digite pelo menos o nome,valor ou a descrição para atualizar os dados!`,
                    status: 1
                })
            } else {
                return ({
                    msg: `Não foi encontrado nenhum plano por esse id, tente outro!`,
                    status: 2
                })
            }
        } else {
            return ({
                msg: `Digite o id para atualizar os dados!`,
                status: 3
            })
        }
    }

    public async delete (idPlan: any) {
        if (idPlan) {
            const plan = await PlansSchema.findOne({_id: idPlan});
            if (plan) {
                await PlansSchema.findOneAndDelete({_id: idPlan});
                return ({
                    msg: `Plano deletado com sucesso!`,
                    status: 1
                })
            }
            return ({
                msg: `Não foi encontrado plano!`,
                status: 2
            });
        }
        return ({
            masg: `Digite o id para deletar o plano`,
            status: 3
        });
    }
}

export { PlansServices }