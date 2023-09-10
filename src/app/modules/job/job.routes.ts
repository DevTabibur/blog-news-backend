import { Router } from 'express'
import { JobController } from './job.controller'

const router = Router()

// **get single job application**
router.get('/:jobId', JobController.getSingleJob)

// **get all job lists**
router.get('/', JobController.getAllJob)

// **create job application**
router.post('/', JobController.createJob)

// **update job application**
router.patch('/:jobId', JobController.updateJob)

// **delete job application**
router.delete('/:jobId', JobController.deleteJob)

export const JobRoute = router
