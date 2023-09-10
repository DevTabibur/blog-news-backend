import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { ITeam } from './team.interface'
import teamModel from './team.model'
import { Types } from 'mongoose'

const getSingleMemberService = async (memberId: string): Promise<ITeam> => {
  const data = await teamModel.findById(memberId)
  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Team Member is not found')
  }
  return data
}

const getAllTeamService = async () => {
  const team = await teamModel.find()
  return team
}

const createTeamMemberService = async (teamData: ITeam): Promise<ITeam> => {
  const createTeam = await teamModel.create(teamData)
  if (!createTeam) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Team Member creation is failed')
  }
  return createTeam
}

const updateTeamMemberService = async (
  memberId: string,
  updateData: Partial<ITeam>,
): Promise<ITeam> => {
  if (!Types.ObjectId.isValid(memberId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member is not found')
  }
  const data = await teamModel.findByIdAndUpdate(
    { _id: memberId },
    updateData,
    { new: true },
  )

  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Member data is filed to upload')
  }

  return data
}

const deleteTeamMemberService = async (memberId: string): Promise<ITeam> => {
  if (!Types.ObjectId.isValid(memberId)) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member is not found')
  }
  const data = await teamModel.findByIdAndDelete(memberId)

  if (!data) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Member delete is failed')
  }

  return data
}

export const TeamService = {
  createTeamMemberService,
  updateTeamMemberService,
  getAllTeamService,
  deleteTeamMemberService,
  getSingleMemberService,
}
