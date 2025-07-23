import { FastifyReply, FastifyRequest } from "fastify"
import { AddMomentService } from "../../service/Moment/AddMomentService";

interface RegisteredMoment {
    title: string,
    story: string,
    visitedLocation: string[],
    user:{userId:string},
    imageUrl: string,
    visitedDate: string
 }
   

class AddMomentContoller {

    async handle (request:FastifyRequest, reply:FastifyReply) {
        const { title, story, visitedLocation, imageUrl, visitedDate}  = request.body as RegisteredMoment;
        const {user} = request;


        if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
            return reply.status(400).send({error: true,message: "All fields are requireds"});

        };

         if (!user) {
            return reply.status(400).send({error: true,message: "User doest not exists"});

        };

        try {
            const newAddMoment = new AddMomentService()
            const AddMoment = await newAddMoment.execute({title,visitedDate,visitedLocation,imageUrl,story,user});

            reply.status(201).send({moment:AddMoment, status:"Moment sucessufuly created"})

        }catch (error:any) {
            reply.status(400).send({error:true,message:error.message})

        }
    }

}
export {
    AddMomentContoller
}