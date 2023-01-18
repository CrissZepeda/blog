import { Router } from 'express'
import { loginUser } from '../controller/user.controller.js'

const router = Router()

router.post('/login', loginUser)

export default router
