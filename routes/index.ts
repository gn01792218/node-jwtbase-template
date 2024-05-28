import { Router } from 'express'
import userRoute from './user'
import roleRoute from './role'

const router = Router()

router.use(userRoute)
router.use(roleRoute)

export default router