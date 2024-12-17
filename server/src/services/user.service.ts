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
    // get get(){
    //     return  this._get
    // },
    // set get(value){
    //     this.get = value
    // },

    getByUserNamr: async function (username: string ):Promise<user>{
    const user =  await User.findOne({username}).exec()
    if (user)
        return user.toUser()
        throw new Error(`username:"${username}"not found!`)
    },

    updateProfile: async function (newProfile: updateProfile,user_id: string ):Promise<user> {
        const user =  await User.findByIdAndUpdate(user_id,{$set: newProfile},{new:true, runValidators:true})
        if(user)
            return user.toUser()
        throw new Error('Someting went wrong, try agin')
    }
}