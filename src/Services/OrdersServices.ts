import OrdersSchema from "../Models/OrdersSchema";

class OrdersServices {
    public async get () {
        const order = await OrdersSchema.find();

        if (order.length > 0) {
            return (order);
        } else {
            return ({
                msg: `Nenhma order cadastrada ainda!`,
                status: 1
            });
        }
    }

    public async create (subscribe_id: any, plans_id: any) {
        if (!subscribe_id && !plans_id) {
            return ({
                msg: `Campos obrigatorios faltando!`,
                status: 1
            });
        } 

        const order = await OrdersSchema.find({
            subscribe_id: {
                _id: subscribe_id
            }
        }).populate('subscribe_id')

        if(order.length > 0) {
            order.map(async (item: any) => {
                await OrdersSchema.findOneAndDelete({_id: item?._id});
            })
        }

        let data = {subscribe_id, plans_id}

        const orderUser = await OrdersSchema.create(data)

        return orderUser
    }

    public async list (idOrder: any) {
        if (!idOrder) {
            return ({
                msg: `Digite o id da order para busca-lá!`,
                status: 1
            });
        } else {
            const order = await OrdersSchema.findOne({subscribe_id: idOrder}).populate('subscribe_id plans_id');
            if (!order) {
                return ({
                    msg: `Order não encontrada!`,
                    status: 2
                })
            }
            return (order)
        }
    }

    public async update (idOrder: any, subscribe_id: any, plans_id: any) {
        if (!idOrder) {
            return ({
                msg: `Digite o id da order!`,
                status: 1
            })
        } else {
            if (subscribe_id || plans_id) {
                let data = { idOrder, subscribe_id, plans_id };
                const order = await OrdersSchema.findOneAndUpdate({_id: idOrder}, data, {new: true});
                return (order);
            }
        }
    }

    public async delete (idOrder: any) {
        if (!idOrder) {
            return ({
                msg: `Digite o id da order!`,
                status: 1
            });
        } else {
            const order = await OrdersSchema.findOneAndDelete({_id: idOrder});
            if (!order) {
                return ({
                    msg: `Order não encontrada!`,
                    status: 2
                });
            } else {
                return ({
                    msg: `Order deletado com sucesso!`,
                    status: 3
                })
            }
        }
    }
}

export { OrdersServices };