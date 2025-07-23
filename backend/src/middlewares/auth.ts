import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";


export default async function authAuthetication (request:FastifyRequest, reply:FastifyReply) {
    const authHeader = request.headers["authorization"];
    const token =  authHeader? authHeader.split(" ")[1]: null;


    if (!token) return reply.status(400).send({message: "Token not provided"});

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return reply.status(401).send({message: 'Authorization header is missing', token})
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as {
            userId: string
        }
        request.user = decoded;

    } catch (error:any) {
        return reply.status(400).send({message: "Invalid Token", error: error.message})
    }

}