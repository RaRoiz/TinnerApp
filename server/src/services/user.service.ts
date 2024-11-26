import mongoose, { RootFilterQuery } from "mongoose"
import { updateProfile, user, userPagination, userPaginator } from "../types/user.type"
import { IUserDocument } from "../interfaces/user.interface"
import { $ } from "bun"
import { QueryHelper } from "../helpers/query.helper"

export const UserService = {

    //TODO 
    get: function (pagination: userPagination, user_id: string ):Promise<userPaginator> {
        let filter: RootFilterQuery<IUserDocument> = {
            _id:{$nin:new mongoose.Types.ObjectId(user_id)},
            $and: QueryHelper.parseUserQuery(pagination)
        }
        throw new Error('not implement')
    },

    getByUserNamr: function (username: string ):Promise<user>{
        throw new Error('not implement')
    },

    updateProfile: function (newProfile: updateProfile,user_id: string ):Promise<user> {
        throw new Error('not implement')
    }
}