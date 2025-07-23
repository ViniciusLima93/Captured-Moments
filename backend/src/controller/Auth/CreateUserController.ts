import { FastifyReply, FastifyRequest } from "fastify"
import { CreateUserService } from "../../service/Auth/CreateUserService"

class CreateUserController {

    async handle (request:FastifyRequest, reply:FastifyReply) {
        const { fullName, email, password} = request.body as {fullName:string, email:string, password:string}

        if (!fullName || !email || !password) {
            reply.status(400).send({message: "All fields are requireds"})
        }

        try {
            const createUserService = new CreateUserService()

            const newUser = await createUserService.execute({fullName,email,password})

            reply.status(200).send(newUser)
        } catch (error:any) {
            return reply.status(400).send({error:true, message:error.message})
        }
    }

}

export {CreateUserController}