import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteMomentService } from "../../service/Moment/DeleteMomentService";


class DeleteMomentsControler {

    async handle (request:FastifyRequest, reply:FastifyReply) {

        const {id} = request.params as {id:string};
        const {user} = request;

        if(!user) {
            return reply.status(400).send({message: "User not found"});
        };

        if(!id) {
            return reply.status(400).send({message: "Id not found"});

        };

        try {

            const deleteMomentsService = new DeleteMomentService();
            const deleteMoments  = await deleteMomentsService.execute({
                id, user
            });

            reply.status(204).send({deleteMoments})

        }catch (error:any) {
            return reply.status(400).send({error: true, message:error.message})

        }



    }


}
export {
    DeleteMomentsControler
}