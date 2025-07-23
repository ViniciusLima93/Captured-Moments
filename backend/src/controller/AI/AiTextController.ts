import axios from "axios";
import { FastifyReply, FastifyRequest } from "fastify";

class AiTextController {
 
 
    async handle (request:FastifyRequest, reply:FastifyReply) {
        const { text } = request.body as {text:string};
        try {
            const response = await axios.post('http://localhost:11434/api/generate', {
                 "model": "llama3.2",
                 "prompt":`Hi llama, improve this phrase ${text} and I dont I want your ansswer conatined any more words in this phrase
                 Like: "Here a phrase that you ask...", or something.I wanted a direct answer.Only a final text.No more`,
                 "stream": false,
            }) 
            reply.send(response.data.response)
        }catch (error) {
            reply.status(500).send({message: "Error in process"})
        }

 }

}
export {
 AiTextController

}