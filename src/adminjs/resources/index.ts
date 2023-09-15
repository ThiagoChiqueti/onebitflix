import { ResourceWithOptions } from "adminjs";
import { Category, Course, Episodes } from "../../models";
import { CategoryResourceOptions } from "./Category";
import { courseResourceOptions, courseResoureceFeatures } from "./course";
import { episodeResourceFeatures, episodeResourceOptions } from "./episode";

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: CategoryResourceOptions
    },
    {
        resource: Course,
        options: courseResourceOptions,
        features: courseResoureceFeatures
    },
    {
        resource: Episodes,
        options: episodeResourceOptions,
        features: episodeResourceFeatures
    }

]