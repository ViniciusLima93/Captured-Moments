import { FastifyReply, FastifyRequest } from "fastify"
import prismaClient from "../../prisma";
import { GetUserService } from "../../service/Auth/GetUserService";

class GetUserController {

    async handle (request:FastifyRequest, reply:FastifyReply) {
        const { user } = request;

        if(!user) {
            return reply.status(400).send({error:true,message:"User is required!"})
        }

        try {
            const getUserService = new GetUserService()
            const getUse = await getUserService.execute({user})

            reply.status(200).send({getUse})

        } catch (Error) {
            reply.status(400).send({error:true, message:"User not found!"})
        }


    }

}
export {GetUserController}