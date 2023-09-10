import { Model } from 'mongoose'

export interface ITeam {
  name: { firstName: string; middleName?: string; lastName: string }
  memberImage: string
  position: string
  description: string
  facebook?: string
  linkedIn?: string
  twitter?: string
  github?: string
}

// export interface ITeamModel extends Model<ITeam>{
//     isTeamMemberExists()
// }
