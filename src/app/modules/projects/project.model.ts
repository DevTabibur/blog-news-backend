import { Schema, model } from 'mongoose'
import { IProjects } from './project.interface'

const projectSchema = new Schema<IProjects>(
  {
    projectTitle: {
      type: String,
      required: true,
    },
    clientName: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
    },
    category: {
      type: [String], // Specify type as array of strings
      required: true, // Make the array required
    },
    date: {
      type: Date,
      required: true,
    },
    projectMainImage: {
      type: String,
      required: true,
    },
    projectImage1: { type: String },
    projectImage2: { type: String },
    projectImage3: { type: String },
    projectImage4: { type: String },
    description: {
      type: String,
      required: true,
      minlength: 15,
    },
    liveLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

const projectModel = model<IProjects>('Project', projectSchema)

export default projectModel
