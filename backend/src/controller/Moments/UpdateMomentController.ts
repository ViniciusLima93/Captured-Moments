import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateMomentService } from "../../service/Moment/UpdateMomentService";

interface RegisteredMoment {
    title: string,
    story: string,
    visitedLocation: string[],
    user: {userId: string},
    imageUrl: string,
    visitedDate: string
 }

class UpdateMomentsController {

    async handle (request:FastifyRequest, reply: FastifyReply) {
        const {id} = request.params as {id:string};
        const {title,story,visitedLocation,imageUrl,visitedDate} = request.body as RegisteredMoment;
        const {user} = request;


        if (!user) return reply.status(400).send({error: true, message: "User not found!"})
        
        try {

            const momentUpdateSearch = new UpdateMomentService();
            const updateMoment = await momentUpdateSearch.execute({
                id,
                title,
                story,
                visitedLocation,
                user,
                imageUrl,
                visitedDate
            });

            reply.status(200).send({moment:updateMoment, message:"Update Sucessfuly"})

        } catch (error:any) {
            reply.status(400).send({error: true, message: error.message})


        }

    }

}

export{
    UpdateMomentsController
}