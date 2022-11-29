import path from 'path'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import * as trpcExpress from '@trpc/server/adapters/express'
import connectDB from './utils/connectDB'
import cookieParser from 'cookie-parser'
import { createUserSchema, loginUserSchema } from './schemas/user.schema'
import {
  loginHandler,
  logoutHandler,
  refreshAccessTokenHandler,
  registerHandler,
} from './controllers/auth.controller'
import customConfig from './config/default'
import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server'
import { deserializeUser } from './middleware/deserializeUser'
import { getMeHandler } from './controllers/user.controller'

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

const userRouter = t.router({
  getMe: isAuthorizedProcedure.query(({ ctx }) => getMeHandler({ ctx })),
})

const appRouter = t.mergeRouters(authRouter, userRouter)

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
