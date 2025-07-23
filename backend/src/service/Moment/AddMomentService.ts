import prismaClient from "../../prisma";


interface RegisteredMoment {
    title: string,
    story: string,
    visitedLocation: string[],
    user:{userId:string},
    imageUrl: string,
    visitedDate: string
 }
    

class AddMomentService {

    async execute ({title,story,visitedLocation,user,imageUrl,visitedDate}: RegisteredMoment) {
        const parsedVisitedDate = new Date (parseInt(visitedDate));

          const createRegisteredMoment = await prismaClient.registeredMoments.create({
            data: {
              title,
               story,
               visitedLocation,
               userId: user.userId,
               imageUrl,
               visitedDate:parsedVisitedDate,
            }
        });

        return createRegisteredMoment

    }

}

export {AddMomentService}