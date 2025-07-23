import prismaClient from "../../prisma"


interface RegisteredMoment {
   
    user:{userId:string},
 }
    



class AllMomentsService {

     async execute ({user}: RegisteredMoment) {
         
         const registeredMomentbyUser = await prismaClient.registeredMoments.findMany({
                where: {
                    userId: user?.userId
                }, 
                orderBy: {isFavorite: 'desc'}
          });

          return registeredMomentbyUser;

    }
        

}
export {
    AllMomentsService
}