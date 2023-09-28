//Rotas da API
import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { coursesController } from "./controllers/coursesController";
import { episodesController } from "./controllers/episodesController";
import { authController } from "./controllers/authController";

const router = express.Router();

router.post("/auth/register", authController.register);

router.get("/categories", categoriesController.index);

router.get("/categories/:id", categoriesController.show);

//aqui a sequência importa para não ler o 'featured' como um id

router.get("/courses/featured", coursesController.featured);
router.get("/courses/newest", coursesController.newest);
router.get("/courses/search", coursesController.search);

router.get("/courses/:id", coursesController.show);

router.get("/episodes/stream", episodesController.stream);

export { router };
