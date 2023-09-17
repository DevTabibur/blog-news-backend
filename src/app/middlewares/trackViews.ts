import { NextFunction, Request, Response } from 'express'

const trackViews = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('hitted')
    // const { originalUrl } = req; // Get the requested URL
    // Implement your logic to track views, e.g., save to a database or log to a file
    // console.log(`View tracked for URL: ${originalUrl}`);
    next()
  } catch (error) {
    next(error)
  }
  // Continue processing the request
}

export default trackViews
