import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import bcrypt from "bcrypt";
import { sequelize } from "../database";
import { adminJsResources } from "./resources";
import { Category, Course, Episodes, User } from "../models";
import { locale } from "./locale";

AdminJS.registerAdapter(AdminJSSequelize);

export const adminJS = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  resources: adminJsResources,
  locale: locale,
  branding: {
    companyName: "OneBitFlix",
    logo: "/logoOnebitflix.svg",
    favicon: "/logoOnebitflix.svg",
    theme: {
      colors: {
        primary100: "#ff0043",
        primary80: "#ff1a57",
        primary60: "#ff3369",
        primary40: "#ff4d7c",
        primary20: "#ff668f",
        grey100: "#151515",
        grey80: "#333333",
        grey60: "#4d4d4d",
        grey40: "#666666",
        grey20: "#dddddd",
        filterBg: "#333333",
        accent: "#151515",
        hoverBg: "#151515",
      },
    },
  },
  dashboard: {
    component: AdminJS.bundle("./components/Dashboard"),
    handler: async (req, res, context) => {
      const courses = await Course.count();
      const epsides = await Episodes.count();
      const categories = await Category.count();
      const standartUsers = await User.count({ where: { role: "user" } });

      res.json({
        'Cursos' : courses,
        'Epsidios': epsides,
        'Categorias': categories,
        'Usuários ativos': standartUsers
      })
    },
  },
});

export const adminJSRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJS,
  {
    authenticate: async (email, password) => {
      const user = await User.findOne({ where: { email: email } });

      if (user && user.role === "admin") {
        const matched = await bcrypt.compare(password, user.password);

        if (matched) {
          return user;
        }

        return false;
      }
    },
    cookiePassword: "senha123",
  },
  null,
  {
    resave: false,
    saveUnitialized: false,
  }
);
