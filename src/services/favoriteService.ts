import { Favorite } from "../models"

export const favoriteService = {
    create: async (userId: string | number, courseId: string|number)=>{
        const favorite = Favorite.create({
            courseId,
            userId
        })

        return favorite
    }
}