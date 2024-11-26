import { updateProfile, user, userPagination, userPaginator } from "../types/user.type"

export const UserService = {

    //TODO 
    get: function (pagination: userPagination, user_id: string ):Promise<userPaginator> {
        throw new Error('not implement')
    },

    getByUserNamr: function (username: string ):Promise<user>{
        throw new Error('not implement')
    },

    updateProfile: function (newProfile: updateProfile,user_id: string ):Promise<user> {
        throw new Error('not implement')
    }
}