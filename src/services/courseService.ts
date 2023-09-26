//Métodos de busca no banco de dados
//Famosas Querys
import { Op } from "sequelize";
import { Course } from "../models";

export const courseService = {
  findByIdWithEpisodes: async (id: string) => {
    const courseWithEpisodes = await Course.findByPk(id, {
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      include: {
        association: "episodes",
        attributes: [
          "id",
          "name",
          "synopsis",
          "order",
          ["video_url", "videoUrl"],
          ["seconds_long", "secondsLong"],
        ],
        order: [["order", "ASC"]],
        separate: true,
      },
    });
    return courseWithEpisodes;
  },

  getRandonFeaturedCourses: async () => {
    const featuredCourses = await Course.findAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        featured: true,
      },
    });
    const randonFeaturedCourses = featuredCourses.sort(
      () => 0.5 - Math.random()
    );

    return randonFeaturedCourses.slice(0, 3);
  },

  getTopTenNewest: async () => {
    const courses = await Course.findAll({
      limit: 10,
      order: [["created_at", "DESC"]],
    });
    return courses;
  },

  findByName: async (name: string, page: number, perPage: number) => {
    const offset = (page - 1) * perPage;
    const { count, rows } = await Course.findAndCountAll({
      attributes: ["id", "name", "synopsis", ["thumbnail_url", "thumbnailUrl"]],
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: perPage,
      offset,
    });
    return {
      courses: rows,
      page,
      perPage,
      total: count,
    };
  },
};