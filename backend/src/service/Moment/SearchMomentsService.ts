import prismaClient from "../../prisma"

interface SerachedMoment {
    query: string
    user:{userId:string} | undefined,
 }
    

class SearchAllMoments {

    async execute ({user, query}: SerachedMoment) {
          const searchResult = await prismaClient.registeredMoments.findMany({
            where: {
                userId: user?.userId,
                OR: [
                    {title:{contains: query, mode:'insensitive'}},
                    {story:{contains: query, mode:'insensitive'}},
                    {visitedLocation:{hasSome: [query]}},
                ]
                
            },
            orderBy: {isFavorite: 'desc'}
        })
        return searchResult;
    }
    
}

export{
    SearchAllMoments
}