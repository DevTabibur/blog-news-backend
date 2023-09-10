import { Schema, model } from 'mongoose'
import { IFeedback } from './feedback.interface'

const feedbackSchema = new Schema<IFeedback>(
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

    feedbackDescription: {
      type: String,
      required: true,
      minlength: 10,
    },
    positionName: {
      type: String,
      required: true,
    },
    ratingsIcon: {
      type: String,
    },
    manImage: { type: String, required: true },
  },
  { timestamps: true },
)

const feedbackModel = model<IFeedback>('Feedback', feedbackSchema)

export default feedbackModel
