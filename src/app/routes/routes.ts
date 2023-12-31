import { Router } from 'express'
import { UserRoute } from '../modules/user/user.routes'
import { AuthRoute } from '../modules/auth/auth.routes'
import { BlogRoute } from '../modules/blog/blog.routes'
import {CategoryRoute} from '../modules/category/category.routes'
import { SettingRoute } from '../modules/settings/settings.routes'

const router = Router()

const routes = [
  {
    path: '/auth',
    route: AuthRoute,
  },
  {
    path: '/users',
    route: UserRoute,
  },
  {
    path: '/blog',
    route: BlogRoute,
  },
  {
    path: '/category',
    route: CategoryRoute,
  },
  {
    path: '/settings',
    route: SettingRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export const customRouter = router
