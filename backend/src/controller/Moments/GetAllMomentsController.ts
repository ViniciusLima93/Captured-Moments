import { FastifyReply, FastifyRequest } from "fastify";
import { AllMomentsService } from "../../service/Moment/GetAllMomentsService";

class GetAllMomentsController {

    async handle (request:FastifyRequest, reply:FastifyReply) {

        const {user} = request;

        if(!user) return reply.status(400).send({message: "Token not provided"})

        try {
            const getAllMoments  = new AllMomentsService();
            const allMoments = await getAllMoments.execute({user})

            reply.status(200).send({memories: allMoments})
        
        } catch (error: any) {
            reply.status(400).send({error: true, message: error.message})

        }
    
    }

}

export {
GetAllMomentsController

}