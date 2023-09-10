import { Schema, model } from 'mongoose'
import { IJob } from './job.interface'

const jobSchema = new Schema<IJob>(
  {
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    education: {
      type: String,
      required: true,
    },
    NID: {
      type: String,
      required: true,
    },
    resumeLink: {
      type: String,
      required: true,
    },
    jobPosition: {
      type: String,
      required: true,
    },
    jobCategory: {
      type: String,
      required: true,
    },
    joining: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

const jobModel = model<IJob>('Job', jobSchema)

export default jobModel
