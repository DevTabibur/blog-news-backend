import { Types } from 'mongoose'

export interface IProfile {
  imgUrl: string
  alt?: string
  joinedAt: string // first logged in date and time
}

export interface IBlogImage {
  url: string
  alt?: string
}

export interface IReply {
  author: string
  profile: IProfile
  reply: string
  createdAt: string
}

export interface IComment {
  _id: Types.ObjectId
  author: string
  profile: IProfile
  comment?: string
  likes?: string[] // Array of user IDs who liked the comment
  replies?: IReply[]
  createdAt?: string
}

// for using static methods
// export interface IPostModel extends IPost {
// find
// }
