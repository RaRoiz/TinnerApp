import Elysia, { Static, t } from "elysia"

export const _photo = t.Object({
    id: t.Optional(t.String()),
    url: t.String(),
    is_avatar: t.Optional(t.String()),
    created_at: t.Optional(t.Date()),
    public_id: t.String(),
})

export const _uploadPhoto = t.Object({
    file: t.File({
        type: ['image/png', 'image/jpg', 'image/jpeg'],
        maxSize: '1m',
        error: 'image must be jpg or png and less than 1mb'
    })
})

export type photo = Static<typeof _photo>
export const PhotoDto = new Elysia().model({
    upload: _uploadPhoto,
    photo: _photo,
    photos: t.Array(_photo) 
})