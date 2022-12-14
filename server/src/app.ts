import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'
import connectDB from './utils/connectDB'
import cookieParser from 'cookie-parser'
import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'

import { createUserSchema, loginUserSchema } from './schemas/user.schema'
import {
  createProjectSchema,
  deleteProjectSchema,
  getProjectSchema,
} from './schemas/projects.schema'

import { createTeamSchema, getProjectTeamsSchema } from './schemas/team.schema'
import {
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerHandler,
} from './controllers/auth.controller'
import customConfig from './config/default'
import { deserializeUser } from './middleware/deserializeUser'
import { getMeHandler, getAllUsers } from './controllers/user.controller'
import {
  createProject,
  getAllProjects,
  deleteProject,
  getProject,
  getAllProjectUsers,
} from './controllers/projects.controller'

import { createTeam, getAllTeams } from './controllers/teams.controller'

dotenv.config({ path: path.join(__dirname, './.env') })

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) =>
  deserializeUser({ req, res })

export type Context = inferAsyncReturnType<typeof createContext>

const t = initTRPC.context<Context>().create()

const authRouter = t.router({
  registerUser: t.procedure
    .input(createUserSchema)
    .mutation(({ input }) => registerHandler({ input })),
  loginUser: t.procedure
    .input(loginUserSchema)
    .mutation(({ input, ctx }) => loginHandler({ input, ctx })),
  logoutUser: t.procedure.mutation(({ ctx }) => logoutHandler({ ctx })),
  refreshToken: t.procedure.query(({ ctx }) =>
    refreshAccessTokenHandler({ ctx })
  ),
})

const isAuthorized = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    })
  }
  return next()
})

const isAuthorizedProcedure = t.procedure.use(isAuthorized)

const projectsRouter = t.router({
  createProject: isAuthorizedProcedure
    .input(createProjectSchema)
    .mutation(({ input }) => createProject({ input })),
  getAllProjects: isAuthorizedProcedure.query(getAllProjects),
  deleteProject: isAuthorizedProcedure
    .input(deleteProjectSchema)
    .mutation(({ input }) => deleteProject({ input })),
  getProject: isAuthorizedProcedure
    .input(getProjectSchema)
    .query(({ input }) => getProject({ input })),
  getAllProjectUsers: isAuthorizedProcedure
    .input(getProjectSchema)
    .query(({ input }) => getAllProjectUsers({ input })),
})

const teamRouter = t.router({
  createTeam: isAuthorizedProcedure
    .input(createTeamSchema)
    .mutation(({ input }) => createTeam({ input })),
  getAllTeams: isAuthorizedProcedure
    .input(getProjectTeamsSchema)
    .query(({ input }) => getAllTeams({ input })),
})

const userRouter = t.router({
  getMe: isAuthorizedProcedure.query(({ ctx }) => getMeHandler({ ctx })),
  getAllUsers: isAuthorizedProcedure.query(getAllUsers),
})

const appRouter = t.mergeRouters(
  authRouter,
  userRouter,
  projectsRouter,
  teamRouter
)

export type AppRouter = typeof appRouter

const app = express()
if (process.env.NODE_ENV !== 'production') app.use(morgan('dev'))

app.use(cookieParser())

app.use(
  cors({
    origin: [customConfig.origin, 'http://localhost:3000'],
    credentials: true,
  })
)
app.use(
  '/api/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
)

const port = customConfig.port
app.listen(port, () => {
  console.log(`🚀 Server listening on port ${port}`)

  // CONNECT DB
  connectDB()
})
