import { Request, Response } from 'express'
import catchAsync from '../../../shared/catchAsync'
import { TeamService } from './team.service'
import { sendSuccessResponse } from '../../../shared/customResponse'
import httpStatus from 'http-status'
import { ITeam } from './team.interface'

const getSingleMember = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params
  const data = await TeamService.getSingleMemberService(memberId)
  sendSuccessResponse<ITeam>(res, {
    statusCode: httpStatus.OK,
    message: 'A Team Member retrieved successfully',
    data: data,
  })
})

const getAllTeam = catchAsync(async (req: Request, res: Response) => {
  const team = await TeamService.getAllTeamService()
  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Team Member retrieved successfully',
    data: team,
  })
})

const createTeamMember = catchAsync(async (req: Request, res: Response) => {
  const teamData = req.body
  const teamFile = req.file
  const team = {
    name: {
      firstName: teamData?.firstName as string,
      middleName: teamData?.middleName as string,
      lastName: teamData?.lastName as string,
    },
    memberImage: teamFile?.filename as string,
    position: teamData?.position as string,
    facebook: teamData?.facebook as string,
    linkedIn: teamData?.linkedIn as string,
    twitter: teamData?.twitter as string,
    github: teamData?.github as string,
    description: teamData?.description as string,
  }
  const createTeam = await TeamService.createTeamMemberService(team)
  sendSuccessResponse<ITeam>(res, {
    statusCode: httpStatus.OK,
    message: 'Team Member Created successfully',
    data: createTeam,
  })
})

const updateTeamMember = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params
  const updateData = req.body
  const updateMember = await TeamService.updateTeamMemberService(
    memberId,
    updateData,
  )
  sendSuccessResponse<ITeam>(res, {
    statusCode: httpStatus.OK,
    message: 'Team Member Updated successfully',
  })
})

const deleteTeamMember = catchAsync(async (req: Request, res: Response) => {
  const { memberId } = req.params
  const deletedMember = await TeamService.deleteTeamMemberService(memberId)
  sendSuccessResponse<ITeam>(res, {
    statusCode: httpStatus.OK,
    message: 'Team Member Deleted successfully',
  })
})

export const TeamController = {
  getAllTeam,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  getSingleMember,
}
