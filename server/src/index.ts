import { Elysia, t} from "elysia";
import { example } from "./controllers/example.controller";
import { swaggerConfig } from "./configs/swagger.config";
import { tlsConfig } from "./configs/tls.config";
import {cors} from "@elysiajs/cors";
import { MongoDB } from "./configs/database.config";
import jwt from "@elysiajs/jwt";
import { jwtConfig } from "./configs/jwt.config";
import { AccountComtroller } from "./controllers/account.controller";
import Database from "bun:sqlite";
import { UserController } from "./controllers/user.controller";

MongoDB.connect()

const app = new Elysia()
.use(cors())
.use(jwtConfig)
.use(swaggerConfig)
.use(AccountComtroller)
.use(UserController)
// .use(example)

.listen({
  port: Bun.env.PORT || 8000,
  tls: tlsConfig
})

let protocol = 'http'
if ('cert' in tlsConfig)
protocol = 'https'
console.log(`Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`)
