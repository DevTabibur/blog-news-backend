import { Router } from 'express'
import { UserRoute } from '../modules/user/user.routes'
import { AuthRoute } from '../modules/auth/auth.routes'
import { BlogRoute } from '../modules/blog/blog.routes'
import { ServiceRoute } from '../modules/services/service.routes'
import { FeaturedRoute } from '../modules/featured/featured.routes'
import { FeedbackRoute } from '../modules/feedback/feedback.routes'
import { ProjectRoute } from '../modules/projects/project.routes'
import { FaqRoute } from '../modules/faq/faq.routes'
import { JobRoute } from '../modules/job/job.routes'

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
    path: '/service',
    route: ServiceRoute,
  },
  {
    path: '/featured',
    route: FeaturedRoute,
  },
  {
    path: '/feedback',
    route: FeedbackRoute,
  },
  {
    path: '/project',
    route: ProjectRoute,
  },
  {
    path: '/faq',
    route: FaqRoute,
  },
  {
    path: '/job',
    route: JobRoute,
  },
]

routes.forEach(route => {
  router.use(route.path, route.route)
})

export const customRouter = router
