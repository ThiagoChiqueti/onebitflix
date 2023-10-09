import { Favorite } from "../models";

export const favoriteService = {
  findByUserId: async (userId: number) => {
    const favorites = await Favorite.findAll({
      attributes: [["user_id", "userId"]],
      where: { userId },
      include: {
        association: "course",
        attributes: [
          "id",
          "name",
          "synopsis",
          ["thumbnail_url", "thumbnailUrl"],
        ],
      },
    });

    return {
      userId,
      course: favorites.map((favorite) => favorite.course),
    };
  },

  create: async (userId: string | number, courseId: string | number) => {
    const favorite = Favorite.create({
      courseId,
      userId,
    });

    return favorite;
  },

  delete: async (userId: number, courseId: number)=>{
    await Favorite.destroy({
      where: {
        userId,
        courseId
      }
    })
  },

  isFavorited: async (userId: number, courseId: number) => {
    const favorite = await Favorite.findOne({
      where:{
        userId,
        courseId
      }
    })
    return favorite !== null ? true : false
  }
};
