import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateFavoriteMomentsService } from "../../service/Moment/UpdateFavoriteMomentsSerive";

class UpdateFavoriteMomentsController {

    async handle (request:FastifyRequest, reply:FastifyReply) {

        const {id} = request.params as {id:string}
        const {user} = request
        const {isFavorite} = request.body as {isFavorite:boolean}

        if (!user) {
            return reply.status(400).send({message: "User not found"})
        }

        if (!id) {
            return reply.status(400).send({message: "Image ID is required!"})
        }

        try {

            const updateIsFavoriteMomentsService  = new UpdateFavoriteMomentsService();
            const updateIsFavoriteMoment = await updateIsFavoriteMomentsService.execute({
                id, user, isFavorite
            });

            reply.status(200).send({moment: updateIsFavoriteMoment})

        }catch (error:any) {
            return reply.status(400).send({error: true, message: error.message})
        }

    }

}

export {
    UpdateFavoriteMomentsController
}