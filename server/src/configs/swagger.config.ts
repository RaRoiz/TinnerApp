import swagger  from "@elysiajs/swagger"

export const swaggerConfig = swagger({
    path: '/api-docs',
    documentation:{
        info: {
            title:"TinnerApp API",
            version:"0.0.1"
        }
    }
})