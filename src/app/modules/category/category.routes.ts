import  { Router } from "express"
import { CategoryController } from "./category.controller"
import authGuard from "../../middlewares/authGuard"
import { USER_ROLE } from "../user/user.constant"


const router = Router()


// ** Get All Category
router.get('/', CategoryController.getAllCategory)

// **Create New Category 
router.post('/', authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), CategoryController.postCategory)

// **Delete a CATEGORY
router.delete('/:categoryId', authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), CategoryController.deleteCategory)


// **Update a CATEGORY
router.patch('/:categoryId', authGuard(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN), CategoryController.updateCategory)


export const CategoryRoute = router