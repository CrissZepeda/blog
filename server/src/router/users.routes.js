import { Router } from 'express'
import {
  allUser,
  newUser,
  oneUser,
  deleteUser,
  updateUser,
} from '../controller/user.controller.js'

const router = Router()

router.get('/user', allUser)
router.get('/user/:id', oneUser)
router.post('/user', newUser)
router.delete('/user/:id', deleteUser)
router.put('/user/:id', updateUser)

export default router
