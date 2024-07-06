import express from 'express'
import { boardRoute } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'

const Router = express.Router()

/* Board API */
Router.use('/boards', boardRoute)

/* Column API */
Router.use('/columns', columnRoute)

/* Card API */
Router.use('/cards', cardRoute)

export const APIs_V1 = Router
