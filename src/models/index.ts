import { Category } from "./Category";
import { Course } from "./Course";
import { Episodes } from "./episodes";
import { Favorite } from "./Favorite";
import { Like } from "./Like";
import { User } from "./User";
import { WatchTime } from "./WatchTime";

//definir associações
Category.hasMany(Course, { as: "courses" }); //uma categoria tem vários cursos

Course.belongsTo(Category); //um curso tem várias categorias
Course.belongsToMany(User, { through: Favorite });
Course.belongsToMany(User, { through: Like });
Course.hasMany(Episodes, { as: "episodes" });
Course.hasMany(Favorite, { as: "FavoritesUsers", foreignKey: "course_id" });

Episodes.belongsTo(Course);
Episodes.belongsToMany(User, {through: WatchTime})

Favorite.belongsTo(Course);
Favorite.belongsTo(User);

User.belongsToMany(Course, { through: Favorite });
User.belongsToMany(Course, { through: Like });
User.belongsToMany(Episodes, {through: WatchTime})
User.hasMany(Favorite, { as: "FavoritesCourses", foreignKey: "user_id" });

export { Category, Course, Episodes, Favorite, Like, User, WatchTime };
