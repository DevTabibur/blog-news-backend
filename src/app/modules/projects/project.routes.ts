import { Router } from 'express'
import { ProjectController } from './project.controller'

const router = Router()

// **get single project**
router.get('/:projectId', ProjectController.singleProject)

// **get all projects list**
router.get('/', ProjectController.getAllProject)

// **create new project**
router.post('/', ProjectController.createProject)

// **update project**
router.patch('/:projectId', ProjectController.updateProject)

// **delete project**
router.delete('/:projectId', ProjectController.deleteProject)

export const ProjectRoute = router
