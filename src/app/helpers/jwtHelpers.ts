import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
): string => {
  return jwt.sign(payload, secret)
}

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}

const regenerateToken = async (
  refreshToken: string,
  accessSecret: Secret,
  refreshSecret: Secret,
) => {
  const { _id, role } = await verifyToken(refreshToken, refreshSecret)

  const newToken = createToken({ _id, role }, accessSecret)

  return newToken
}

export const jwtHelpers = {
  createToken,
  regenerateToken,
  verifyToken,
}
