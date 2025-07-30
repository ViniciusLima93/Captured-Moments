import prismaClient from "../../prisma"

interface UpdateMomentsProps {
    id:string,
    user:{userId: string},
    isFavorite: boolean
}

class UpdateFavoriteMomentsService {

    async execute ({
       id,
       isFavorite,
       user
    }: UpdateMomentsProps) {

        const registeredMoments  = await prismaClient.registeredMoments.findFirst({
            where: {
                id: id,
                userId: user.userId
            }
        });

        if (!registeredMoments) {
            throw new Error("Register not found");

        }

        const favoriteUpdate = await prismaClient.registeredMoments.update({
            data: {
                isFavorite: isFavorite,
            },
            where: {
                id:id
            }
        });
        

        return favoriteUpdate;


    }

}

export {
   UpdateFavoriteMomentsService 
}