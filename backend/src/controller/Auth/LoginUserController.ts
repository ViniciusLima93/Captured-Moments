import { FastifyReply, FastifyRequest } from "fastify"

import { LoginUserService } from "../../service/Auth/LoginUserService "

class LoginUserController {

    async handle (request:FastifyRequest, reply:FastifyReply) {
        const {  email, password} = request.body as {fullName:string, email:string, password:string}

        if ( !email || !password) {
            reply.status(400).send({message: "All fields are requireds"})
        }

        try {
            const loginUserService = new LoginUserService()

            const login = await loginUserService.execute({email, password})

            reply.status(200).send(login)
        } catch (error:any) {
            return reply.status(400).send({error:true, message:error.message})
        }
    }

}

export {LoginUserController}