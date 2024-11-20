import { Elysia, t} from "elysia";
import { example } from "./controllers/example.controller";
import { swaggerConfig } from "./configs/swagger.config";
import { tlsConfig } from "./configs/tls.config";
import {cors} from "@elysiajs/cors";
import { MongoDB } from "./configs/database.config";
import jwt from "@elysiajs/jwt";
import { jwtConfig } from "./configs/jwt.config";
import { AccountComtroller } from "./controllers/account.controller";

MongoDB.connect()

const app = new Elysia()
.use(cors())
// .use(example)
.use(swaggerConfig)
.use(jwtConfig)
.use(AccountComtroller)

.listen({
  port: Bun.env.PORT || 6666,
  tls: tlsConfig
})

let protocol = 'http'
if ('cert' in tlsConfig)
protocol = 'https'
console.log(`🦊 Elysia is running at ${protocol}://${app.server?.hostname}:${app.server?.port}`);
