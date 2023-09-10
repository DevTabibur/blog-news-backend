import { Schema, model } from 'mongoose'
import { IFaq } from './faq.interface'

const faqSchema = new Schema<IFaq>(
  {
    title: {
      type: String,
      required: true,
      minlength: 4,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
    },
  },
  {
    timestamps: true,
  },
)

const faqModel = model<IFaq>('Faq', faqSchema)

export default faqModel
