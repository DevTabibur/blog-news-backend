import express, { Application, Request, Response } from 'express'
import cors from 'cors'
const app: Application = express()
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import dbConnect from './app/utils/dbConnect'
import httpStatus from 'http-status'
import cookieParser from 'cookie-parser'
import { customRouter } from './app/routes/routes'

// using cors
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
// to serve upload folders (images)
app.use(express.static('./upload'))
// for using ejs
app.set('view engine', 'ejs')

// db connect
dbConnect()

app.get('/', (req: Request, res: Response) => {
  // let's render here ejs index.ejs file
  res.render('index.ejs')
})

// to get all routes
app.use('/api/v1', customRouter)

// to handle global errors
app.use(globalErrorHandler)

// not found routes
// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
app.all('*', (req, res, next) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: 'false',
    message: `No API is found. Try Another API`,
    errorMessages: [
      {
        message: `No API is found for ${req.method} Method ${req.originalUrl}`,
        path: req.originalUrl,
      },
    ],
    stack: '',
  })
})

export default app
