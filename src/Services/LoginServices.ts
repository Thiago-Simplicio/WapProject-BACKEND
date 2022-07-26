import UsersSchema from "../Models/UsersSchema";

class LoginServices {
    public async login (email_user: any) {
        const user = await UsersSchema.findOne({email_user: email_user});
            if(!user) {
                return ({
                    msg: `Usuario não encontrado com esse e-mail`,
                    status: 1
                })
            } else {
                return ({
                    user_name: user?.name_user,
                    user_email: user?.email_user,
                    id: user?._id,
                    status: 2
                })
            }
    }
}

export { LoginServices }