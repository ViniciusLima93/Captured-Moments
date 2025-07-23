import prismaClient from "../../prisma";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthUtils } from "../../Utils/AuthUtils";

interface UserProps {
    email:string,
    password:string
}

class LoginUserService {

    async execute ({ email, password}: UserProps) {
         const user  = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        });


         if (!user) {
                    throw new Error("User not found")
                }
        
                const isPasswordValid = await bcrypt.compare(password,user.password);
                if(!isPasswordValid)  throw new Error("Credentials invalid")
                            
                const acessToken = AuthUtils.generateAcessToken(user.id);
                
                return {
                    error: false,
                    message: "Sucessfull login",
                    user:{user:user.fullName,email:user.email},
                    acessToken
                }
        

    }


}

export {LoginUserService}