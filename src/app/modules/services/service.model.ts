import { Schema, model } from 'mongoose'
import { IService } from './service.interface'

const serviceSchema = new Schema<IService>(
  {
    serviceImage: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: 10,
    },
  },
  {
    timestamps: true,
  },
)

const serviceModel = model<IService>('Service', serviceSchema)

export default serviceModel
