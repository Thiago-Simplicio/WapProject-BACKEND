import mongoose from 'mongoose';
import UserSchema from '../Models/UsersSchema';
import OrderSchema from '../Models/OrdersSchema';
import moment from 'moment'

class UsersServices {
    public async get () {

        const user = await UserSchema.find();
            return user
    }

    public async create (email_user: any, name_user: any) {

        const user = await UserSchema.findOne({email_user});

        if (user) {
            return ({
                msg: `Usuario já cadastrado`,
                status: 1
            })
        } else {
            let data = { email_user, name_user };
            const userCreate = await UserSchema.create(data);
            return ({
                user: userCreate,
                status: 2
            })
        }
    }

    public async list (idUser: any) {

        const user = await UserSchema.findOne({_id: idUser});
        
        if (!user) {
            return ({
                msg: `Usuario não encontrado com esse id`,
                status: 1
            })
        } else {
            return ({
                user,
                status: 2
            })
        }
    }

    public async update (idUser: any, email_user: any, name_user: any) {
        if (email_user || name_user) {
            const user = await UserSchema.findOne({_id: idUser});
            if(!user) {
                return {
                    msg: `Usuario não encontrado!`,
                    status: 1
                }
            } else {
                const userExist = await UserSchema.findOne({email_user})
                if (userExist) {
                    return ({
                        msg: `Já existe um usario com esse email!`,
                        status: 2
                    })
                } else {
                    let data = {idUser,email_user, name_user};
                    const newUser = await UserSchema.findOneAndUpdate({_id: idUser}, data, {new: true});
                    return ({
                        user: newUser
                    })
                }
            }
        } else {
            return ({
                msg: `Digite pelo menos o email ou nome para atualizar`,
                status: 3
            })
        }
    }

    public async delete (idUser: any) {
        if(idUser) {
            const user = await UserSchema.findOne({_id: idUser});
                if(user) {
                    await UserSchema.findOneAndDelete({_id: idUser});
                    return ({
                        msg: `Usuario deletado com sucesso!`,
                        status: 1
                    })
                } else {
                    return ({
                        msg: `Usuario não encontrado!`,
                        status: 2
                    })
                }
        } else {
            return ({
                msg: `Digite pelo menos o id do Usuario`,
                status: 3
            })
        }
    }

    public async getPlansUser (idUser: any) {

        let data: any[] = []

        if(idUser) {
            const order = await OrderSchema.find({
                subscribe_id: {
                    _id: idUser
                }
            }).populate("subscribe_id plans_id");

            if (!order) {
                return ({
                    msg: `Você não tem planos contratados!`,
                    status: 1
                })
            } else {
                order?.map((item: any) => {
                    return data.push({
                        _idOrder: item?._id,
                        name_plan: item?.plans_id?.name_plan,
                        value_plan: item?.plans_id?.value_plan,
                        description: item?.plans_id?.description_plan,
                        dataCreate: moment( new Date (item?.createdAt) ).format("DD/MM/YYYY hh:mm")
                    })
                })
            }
        }

        return data
    }
}

export { UsersServices }