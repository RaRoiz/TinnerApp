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

    .delete('/:photo_id', async ({params:{photo_id}, set}) => {
        try {
            await PhotoService.delete(photo_id)
            set.status = "No Content"
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error) {
                throw error
            }
            throw new Error("Something is wrong")
        }
    },{
        detail: {summary: "Delete photo by photo_id"},
        isSignIn: true,
        params: "photo_id",
    })

    .get('/', async ({Auth}) => {
        const user_id = (Auth.payload as AuthPayload).id
        return await PhotoService.getPhotos(user_id)
    },{
        detail: {summary: "Get photo[] by user_id"},
        isSignIn: true,
        response: "photos"
    })

    .post('/', async ({ body: { file }, set, Auth }) => {
        console.log('What?')
        const user_id = (Auth.payload as AuthPayload).id
        try {
            return await PhotoService.upload(file, user_id)
        } catch (error) {
            set.status = "Bad Request"
            if (error instanceof Error) {
                throw error
            }
            throw new Error("Something is wrong")
        }
    }, {
        detail: { summary: "Upload photo" },
        body: "upload",
        response: "photo",
        isSignIn: true
    })
