import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controller/Auth/CreateUserController";
import { LoginUserController } from "./controller/Auth/LoginUserController";
import { GetUserController } from "./controller/Auth/GetUserController";
import authAuthetication from "./middlewares/auth";
import { AddMomentContoller } from "./controller/Moments/AddMomentContoller";
import { GetAllMomentsController } from "./controller/Moments/GetAllMomentsController";
import { SearchedMomentsController } from "./controller/Moments/SearchedMomentsController";
import { UpdateMomentsController } from "./controller/Moments/UpdateMomentController";
import { AiTextController } from "./controller/AI/AiTextController";
import { upload } from "./config/multer";
import { UploadFileController } from "./controller/Uploads/UploadFileController";



export default function routes(fastify:FastifyInstance ) {
   
    
    fastify.get('/get-user', {preHandler: authAuthetication}, (request: FastifyRequest, reply: FastifyReply) => {
        return new GetUserController().handle(request,reply);
    })
    
    fastify.post('/create-account', (request:FastifyRequest, reply:FastifyReply) => {
        return new CreateUserController().handle(request,reply)
    });

    fastify.post('/login', (request:FastifyRequest, reply:FastifyReply) => {
        return new LoginUserController().handle(request,reply)
    });

    fastify.post('/add-registered-moment',{preHandler: authAuthetication}, (request: FastifyRequest, reply: FastifyReply) => {
        return new AddMomentContoller().handle(request,reply)    
    });

    fastify.get('/get-all-moments',{preHandler: authAuthetication},(request:FastifyRequest, reply:FastifyReply) => {
        return new GetAllMomentsController().handle(request,reply)
    });

    fastify.get('/search', {preHandler: authAuthetication}, (request:FastifyRequest, reply: FastifyReply) => {
        return new SearchedMomentsController().handle(request, reply)
    });

    fastify.put('/edit-moments/:id',{preHandler: authAuthetication}, async (request:FastifyRequest, reply: FastifyReply) => {
        return new UpdateMomentsController().handle(request,reply);    
    });

    fastify.post('/ia', async (request: FastifyRequest, reply:FastifyReply) => {
        return new AiTextController().handle(request,reply);

    });

    fastify.post('/upload-image',  {preHandler: upload.single("image")}, async (request:FastifyRequest, reply:FastifyReply) => {
        return new UploadFileController().handle(request, reply);
    });
     

    



}