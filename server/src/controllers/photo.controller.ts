import Elysia, { t } from "elysia";
import { PhotoService } from "../services/photo.service";
import { PhotoDto } from "../types/photo.type";
import { AuthMiddleware, AuthPayload } from "../middlewares/auth.middleware";

export const PhotoController = new Elysia({
    prefix: "api/photo",
    tags: ["Photo"]
})
    .use(PhotoDto)
    .use(AuthMiddleware)
    .post('/', async ({ body: { file }, set, Auth }) => {
        console.log('What?')
        const user_id = (Auth.payload as AuthPayload).id
        try {
            return await PhotoService.upload(file, user_id)
        } catch (error) {
            set.status = 400 //bad request
            if (error instanceof Error) {
                throw error
            }
            throw new Error("Something went wrong ,try again broooo!!")
        }
    }, {
        detail: { summary: "Upload photo" },
        body: "upload",
        response: "photo",
        isSignIn: true
    })
