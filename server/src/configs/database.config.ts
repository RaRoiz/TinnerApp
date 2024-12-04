import { connect } from "bun"
import mongoose from "mongoose"

const username = Bun.env.MONGO_GO_USER|| 'tatapholph'
const db_password = Bun.env.MONGO_GO_PASS|| 'yourpassword'
const db_name = Bun.env.MONGO_DBNAME ||'tinnerapp'

const uri = `mongodb+srv://${username}:APGT5uYPzlhPJejk@cluster0.uladk.mongodb.net/?retryWrites=true&w=majority&appName=${db_name}`

export const MongoDB = {
    connect:async function (){
        try {
            await mongoose.connect(uri)
            console.log('--- MongoDB Conneted ---')
        } catch (error) {
            console.error('--- MongoDB connection error ---')
            console.error(error)
        }
    }
}
