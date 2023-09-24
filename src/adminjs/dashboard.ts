import AdminJS, { PageHandler } from "adminjs";
import { Category, Course, Episodes, User } from "../models";

export const dashboardoptions: {
    handler?: PageHandler
    component?: string
} = {
  component: AdminJS.bundle("./components/Dashboard"),
  handler: async (req, res, context) => {
    const courses = await Course.count();
    const epsides = await Episodes.count();
    const categories = await Category.count();
    const standartUsers = await User.count({ where: { role: "user" } });

    res.json({
      Cursos: courses,
      Epsidios: epsides,
      Categorias: categories,
      "Usuários ativos": standartUsers,
    });
  },
};
