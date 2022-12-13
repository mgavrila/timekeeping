import { TRPCError } from '@trpc/server'
import { Context } from '../app'
import { findAllUsers } from '../services/user.service'
import { sanitize } from '../utils/converter'

export const getMeHandler = ({ ctx }: { ctx: Context }) => {
  try {
    const user = ctx.user
    return {
      status: 'success',
      user,
    }
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}

export const getAllUsers = async () => {
  try {
    const users = await findAllUsers()

    return {
      status: 'success',
      users: sanitize(users, true),
    }
  } catch (err: any) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: err.message,
    })
  }
}
