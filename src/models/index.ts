import { Category } from "./Category";
import { Course } from "./Course";
import { Episodes } from './episodes'
import { User } from "./User";

//definir associações
Category.hasMany(Course)//uma categoria tem vários cursos

Course.belongsTo(Category)//um curso tem várias categorias

Course.hasMany(Episodes)

Episodes.belongsTo(Course)
export {
    Category,
    Course,
    Episodes,
    User
}