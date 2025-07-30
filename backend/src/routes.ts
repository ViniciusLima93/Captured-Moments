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
import { DeleteFileController } from "./controller/Uploads/DeleteUploadController";
import { DeleteMomentsControler } from "./controller/Moments/DeleteMomentsController";
import { UpdateFavoriteMomentsController } from "./controller/Moments/UpdateFavoriteMomentsController";



export default function routes(fastify:FastifyInstance ) {

    //Auth to create a user
    fastify.post('/create-account', (request:FastifyRequest, reply:FastifyReply) => {
        return new CreateUserController().handle(request,reply)
    });

    //Login  
    fastify.post('/login', (request:FastifyRequest, reply:FastifyReply) => {
        return new LoginUserController().handle(request,reply)
    });
   
    //LOOK UP A user
    fastify.get('/get-user', {preHandler: authAuthetication}, (request: FastifyRequest, reply: FastifyReply) => {
        return new GetUserController().handle(request,reply);
    });
     

    //To create a moment registered
    fastify.post('/add-registered-moment',{preHandler: authAuthetication}, (request: FastifyRequest, reply: FastifyReply) => {
        return new AddMomentContoller().handle(request,reply)    
    });

    //To view all moments
    fastify.get('/get-all-moments',{preHandler: authAuthetication},(request:FastifyRequest, reply:FastifyReply) => {
        return new GetAllMomentsController().handle(request,reply)
    });

    //Search by title, story and Visited location 
    fastify.get('/search', {preHandler: authAuthetication}, (request:FastifyRequest, reply: FastifyReply) => {
        return new SearchedMomentsController().handle(request, reply)
    });

    //edit moments
    fastify.put('/edit-moments/:id',{preHandler: authAuthetication}, async (request:FastifyRequest, reply: FastifyReply) => {
        return new UpdateMomentsController().handle(request,reply);    
    });

    //IA
    fastify.post('/ia', async (request: FastifyRequest, reply:FastifyReply) => {
        return new AiTextController().handle(request,reply);

    });


    // to upload a image
    fastify.post('/upload-image',  {preHandler: upload.single("image")}, async (request:FastifyRequest, reply:FastifyReply) => {
        return new UploadFileController().handle(request, reply);
    });
    
    // to delete a image
     fastify.delete('/delete-image',  {preHandler: upload.single("image")}, async (request:FastifyRequest, reply:FastifyReply) => {
        return new DeleteFileController().handle(request, reply)
    });


    //delete moment
    fastify.delete('/delete-moments:/id',{preHandler: authAuthetication}, async (request:FastifyRequest, reply:FastifyReply) => {
        return new DeleteMomentsControler().handle(request,reply)
    });

    //update favoorite moment
    fastify.put('/update-is-favorite/:id',{preHandler: authAuthetication}, async (request:FastifyRequest, reply:FastifyReply) => {
       return new UpdateFavoriteMomentsController().handle(request,reply)
    
    });
    



}