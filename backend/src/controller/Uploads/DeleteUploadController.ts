import { FastifyReply, FastifyRequest } from "fastify"
import { DeleteFileService } from "../../service/Upload/DeleteUploadService";

class DeleteFileController {

    async handle(request:FastifyRequest, reply: FastifyReply) {
        const {imageUrl} = request.query as {imageUrl: string};
        
        if (!imageUrl) {
            return reply.status(400).send({error:true, message: 'ImageUrl paramater is required'})

        }

        try {

            const deleteSFileService =  new DeleteFileService()
            const deleteService = await deleteSFileService.execute({imageUrl})

            return reply.status(200).send(deleteService)

        }catch (error: any) {
            return reply.status(400).send({erro:true, message:error.message})

        }
    }

}
export {
    DeleteFileController
}