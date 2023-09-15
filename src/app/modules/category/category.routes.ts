import  { Router } from "express"
import { CategoryController } from "./category.controller"


const router = Router()


// ** Get All Category
router.get('/', CategoryController.getAllCategory)


export const CategoryRoute = router