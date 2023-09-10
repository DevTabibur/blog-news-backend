import { Schema, model } from 'mongoose'
import { ITeam } from './team.interface'

const teamSchema = new Schema<ITeam>(
  {
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String },
      lastName: { type: String, required: true },
    },
    memberImage: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 15,
    },
    facebook: { type: String },
    linkedIn: { type: String },
    twitter: { type: String },
    github: { type: String },
  },
  {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    // },
  },
)

const teamModel = model<ITeam>('Team', teamSchema)

export default teamModel
