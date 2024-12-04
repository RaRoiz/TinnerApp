import Elysia from "elysia";
import { AuthMiddleware, AuthPayload } from "../middlewares/auth.middleware";
import { UserDto } from "../types/user.type";
import { UserService } from "../services/user.service";

export const UserController = new Elysia({
    prefix:"/api/user",
    tags: ['User']
})
    .use(AuthMiddleware)
    .use(UserDto)

    .get('/all', () => {
        return {
            text: "Hello Word"
        }
     },{
        isSignIn: true,
     })

     .get('/user' , ({query,Auth}) => {
        const user_id = (Auth.payload as AuthPayload).id
        return UserService.get(query,user_id)
     }, {
        detail: {summary: "Get User"},
        query: "pagination",
        response: "users",
        isSignIn: true,
     })

     .patch('/',({body,set,Auth}) => {
         try {
            const user_id = (Auth.payload as AuthPayload).id
            return UserService.updateProfile(body,user_id)
            set.status = "No Content"
            
         } catch (error) {
            set.status = "Bad Request"
         if (error instanceof Error)
             throw new Error(error.message)
      set.status = 500
         throw new Error('Something went wrong, try agian later')
     }
   }, {
      detail: {summary: "Update Profile"},
      body: "updateProfile",
      response: "user",
      isSignIn: true
     })