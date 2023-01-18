import { Router } from 'express'
import {
  allPost,
  onePost,
  onePostbyUserId,
  newPost,
  updatePost,
  deletePost,
} from '../controller/post.controller.js'

const router = Router()

router.get('/post', allPost)
router.get('/post/:id', onePost)
router.get('/posts/:id', onePostbyUserId)
router.post('/post/:id', newPost)
router.put('/post/:id', updatePost)
router.delete('/post/:id', deletePost)

export default router
