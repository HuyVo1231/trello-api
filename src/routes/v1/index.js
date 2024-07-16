import express from 'express'
import { boardRoute } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'
import { userRoute } from '~/routes/v1/userRoute'

const Router = express.Router()

/* Board API */
Router.use('/boards', boardRoute)

/* Column API */
Router.use('/columns', columnRoute)

/* Card API */
Router.use('/cards', cardRoute)

// User
Router.use('/user', userRoute)

export const APIs_V1 = Router
