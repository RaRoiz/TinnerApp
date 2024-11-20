import { User } from "../models/user.model";
import { login, register, user } from "../types/account.type";

export const AccountService = {
    login:async function(loginData:login):Promise<user>{
        const user = await User.findOne({username:loginData.username}).exec()
        //TODO: implement like and photo

        if(!user)
            throw new Error("User does not Real")
        const verifyPassword = await user.verifyPassword(loginData.password)
        if(!verifyPassword)
            throw new Error("Password is incrroect")
        return user.toUser()
    },
    createNewUser: async function(registerData: register):Promise<user>{
        const user = await User.findOne({username:registerData.username}).exec()
        if(user)
            throw new Error(`${registerData.username}username is use already`)     
        const newUser = await User.createUser(registerData)  
        return newUser.toUser()
    }
}