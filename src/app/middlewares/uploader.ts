import { Request } from 'express'
import multer from 'multer'
import path from 'path'

const UPLOADS_FOLDER = './upload'

// Define the storage
const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, UPLOADS_FOLDER)
  },

  filename: (req: Request, file, cb) => {
    const fileExt = path.extname(file.originalname)
    const fileName =
      file.originalname
        .replace(fileExt, '')
        .toLowerCase()
        .split(' ')
        .join('-') +
      '-' +
      Date.now()

    cb(null, fileName + fileExt)
  },
})

// Upload middleware
const uploader = multer({
  storage: storage,
  limits: {
    fileSize: 3000000, // 3mb
  },

  fileFilter: (req: Request, file, cb) => {
    // console.log('fileFilter', file);
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      cb(new Error('Only .jpg, .png, .jpeg formats are allowed'))
    }
  },
})

export = uploader
