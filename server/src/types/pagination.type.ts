import {Static, t, TSchema} from "elysia"

export const _pagination = t.Object({
    pageSize: t.Number(),
    currentPage: t.Number(),
    length: t.Optional(t.Number()),
})

export type paginator = Static<typeof _pagination>

export function CreatePagination <T extends TSchema,U extends TSchema>(itemType : T , paginatorType: U) {
    return t.Object({
        items: t.Array(itemType),
        paginator: paginatorType,
    })
}