import fastify, { FastifyReply, FastifyRequest } from "fastify";
import routes from "./routes";
import fastifyMultipart from "@fastify/multipart";

const app = fastify({logger:true});


app.register(routes);
app.register(fastifyMultipart);



export default app;