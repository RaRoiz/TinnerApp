import mongoose, { RootFilterQuery } from "mongoose"
import { updateProfile, user, userPagination, userPaginator } from "../types/user.type"
import { IUserDocument } from "../interfaces/user.interface"
import { QueryHelper } from "../helpers/query.helper"
import { User } from "../models/user.model"

export const UserService = { 
    _get: async function (pagination: userPagination, user_id: string ):Promise<userPaginator> {
        let filter: RootFilterQuery<IUserDocument> = {
            _id:{$nin:new mongoose.Types.ObjectId(user_id)},
            $and: QueryHelper.parseUserQuery(pagination)
        }
    const query = User.find(filter).sort({last_ative: - 1})
    const skip = pagination.pageSize * (pagination.currentPage - 1)
    query.skip(skip).limit(pagination.pageSize)

    const [docs, total] = await Promise.all ([
        query.exec(),
        User.countDocuments(filter).exec()
    ])
    
    pagination.length = total
    return {
        paginator: pagination,
        items: docs.map(docs => docs.toUser()),
        }
    },
    get get(){
        return  this._get
    },
    set get(value){
        this.get = value
    },

    getByUserNamr: function (username: string ):Promise<user>{
        throw new Error('not implement')
    },

    updateProfile: function (newProfile: updateProfile,user_id: string ):Promise<user> {
        throw new Error('not implement')
    }
}