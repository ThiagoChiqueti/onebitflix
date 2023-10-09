import { Favorite } from "../models"

export const favoriteService = {

    findByUserId: async (userId: number) => {
        const favorites = await Favorite.findAll({
          attributes: [['user_id', 'userId']],
          where: { userId },
          include: {
            association: 'course',
            attributes: [
              'id',
              'name',
              'synopsis',
              ['thumbnail_url', 'thumbnailUrl']
            ]
          }
        })
    
        return {
          userId,
          course: favorites.map(favorite => favorite.course)
        }
      },

    create: async (userId: string | number, courseId: string|number)=>{
        const favorite = Favorite.create({
            courseId,
            userId
        })

        return favorite
    }
}