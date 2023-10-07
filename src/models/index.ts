import { Category } from "./Category";
import { Course } from "./Course";
import { Episodes } from "./episodes";
import { Favorite } from "./Favorite";
import { User } from "./User";

//definir associações
Category.hasMany(Course, { as: "courses" }); //uma categoria tem vários cursos

Course.belongsTo(Category); //um curso tem várias categorias
Course.belongsToMany(User, { through: Favorite });
Course.hasMany(Episodes, { as: "episodes" });
Course.hasMany(Favorite, { as: "FavoritesUsers", foreignKey: "course_id" });

Episodes.belongsTo(Course);

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

User.belongsToMany(Course, { through: Favorite });
User.hasMany(Favorite, { as: "FavoritesCourses", foreignKey: "user_id" });

export { Category, Course, Episodes, Favorite, User };
