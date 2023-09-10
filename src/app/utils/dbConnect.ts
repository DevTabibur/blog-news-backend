import mongoose from 'mongoose'
import config from '../../config/config'

const URI = config.database_string
const dbConnect = async (): Promise<void> => {
  try {
    if (!URI) {
      console.log('Database String is not found')
    }
    await mongoose.connect(URI as string)
    console.log(`Database is connected`)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(`database error`, error.message)
  }
}

export default dbConnect
