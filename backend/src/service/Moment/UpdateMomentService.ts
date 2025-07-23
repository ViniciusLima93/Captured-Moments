import prismaClient from "../../prisma";

interface RegisteredMoment {
    title: string,
    story: string,
    visitedLocation: string[],
    user: {userId: string},
    imageUrl: string,
    visitedDate: string
 }

 type UpdatedMomentProps = RegisteredMoment & {id:string}


class UpdateMomentService {

    async execute ({
        id,
        imageUrl,
        story,
        title,
        user,
        visitedDate,
        visitedLocation}: UpdatedMomentProps) {

       const parsedVisitedDate = new Date(parseInt(visitedDate));


       const registredeMoment = await prismaClient.registeredMoments.findFirst({
            where: {
                id: id,
                userId: user.userId
            }
        });

       if (!registredeMoment) throw new Error ("Register moment not found!");
       
       const placeHolderImage = `http://localhost:8000/uploads/place-image.png`;
       
       const updateRegisterdMoment = await prismaClient.registeredMoments.update({
            where:{
                id:id
            },
            data: {
                title:title,
                story:story,
                visitedLocation: visitedLocation,
                imageUrl:imageUrl || placeHolderImage,
                visitedDate: parsedVisitedDate,
            }
        });

        return updateRegisterdMoment

       
    }

}
export {
    UpdateMomentService
}