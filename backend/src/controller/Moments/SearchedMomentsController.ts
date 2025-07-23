import { FastifyReply, FastifyRequest } from "fastify";
import { SearchAllMoments } from "../../service/Moment/SearchMomentsService";

class SearchedMomentsController {

    async handle (request:FastifyRequest, reply: FastifyReply) {
        const {query}  = request.query as {query: string};
        const {user} = request;

        if(!user) {
            throw new Error("User does not exists!")
        };

        try {
            const searchedAllMoments = new SearchAllMoments();
            const searchedMemories = await searchedAllMoments.execute({query, user});
            
            reply.status(200).send({moment:searchedMemories})

        }catch (error:any) {
            reply.status(400).send({error: true, message:error.message})    
        }
    }

}

export {
    SearchedMomentsController
}