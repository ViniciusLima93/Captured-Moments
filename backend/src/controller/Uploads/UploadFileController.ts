import { FastifyReply, FastifyRequest } from "fastify";
import { UploadFileService } from "../../service/Upload/UploaFileService";

class UploadFileController {

    async handle(request:FastifyRequest, reply:FastifyReply) {

        const file = (request as any).file;

        if(!file.filename) {
            return reply.status(400).send({error: true, message: "File not found"});
        }

        try {
            const uploadService = new UploadFileService();
            const uploadFile = await uploadService.execute({file})
                   
            reply.status(201).send({imageUrl: uploadFile});            

        } catch (error:any) {
            return reply.status(400).send({error: true, message: error.message});

        }

    }
}

export { UploadFileController };