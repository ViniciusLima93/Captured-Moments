import prismaClient from "../../prisma";
import path from 'path';
import fs from 'fs'

interface UserProprs {
    user: {
        userId: string
    }
}

type DeleteRegisterProps = UserProprs & {id: string};


class DeleteMomentService {

    async execute ({id,user}:DeleteRegisterProps) {
        const registerMoment = await prismaClient.registeredMoments.findFirst({
            where: {
                id:id,
                userId:user.userId
            }
        });

        if(!registerMoment) {
            throw new Error("Register Moment not found");

        }

        await prismaClient.registeredMoments.delete({
            where:{
                id:id,
                userId: user.userId
            }
        });

        const imageUrl = registerMoment.imageUrl;
        const fileName = path.basename(imageUrl);

        if (fileName === 'place-image') {
            return ({message: 'Image default has been preserved'})

        };

        const FilePath = path.join(__dirname, '..','..','..','uploads', fileName);

        fs.unlink(FilePath, (err) => {
            if(err) {
                console.log("Faleid to delete image file ", err);
            }
        })

        return {message: 'Register moments deleted sussecufuly'}


    }

}
export {
    DeleteMomentService
}