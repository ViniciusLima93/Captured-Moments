import prismaClient from "../../prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthUtils } from "../../Utils/AuthUtils";

interface UserProps {
    fullName:string,
    email:string,
    password:string
}

class CreateUserService {

    async execute ({fullName, email, password}: UserProps) {
         const isUser  = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });

        if(isUser) {
           throw new Error("User already exists")
        }

        const hashedPassword = await bcrypt.hash(password, 10); //10 is a salt

        const user = await prismaClient.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword
            }
        })

       

          const acessToken = AuthUtils.generateAcessToken(user.id)

        return{
            error: false,
            user: {
                fullName: user.fullName, email:user.email
            },
            acessToken,
            message:"User sucessufull regristred"
        }

    }


}

export {CreateUserService}