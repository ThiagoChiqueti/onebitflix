import { Category } from "./Category";
import { Course } from "./Course";
import { Episodes } from './episodes'
import { User } from "./User";

//definir associações
Category.hasMany(Course, {as: 'courses'})//uma categoria tem vários cursos

Course.belongsTo(Category)//um curso tem várias categorias

Course.hasMany(Episodes, {as: 'episodes'})

Episodes.belongsTo(Course)
export {
    Category,
    Course,
    Episodes,
    User
}