import { Router } from 'express'

const router = Router()

/* router.get('/', getAllpost)
router.get('/:id', getDetailsPost)
router.post('/:id', newPosts)
router.put('/:id', updatePost)
router.delete('/:id', deletePost) */

router.get('/comment', (req, res) => {
  res.send('getAll')
})
router.get('/comment/:id', (req, res) => {
  res.send('getDetails')
})
router.post('/comment', (req, res) => {
  res.send('Post')
})
router.put('/comment/:id', (req, res) => {
  res.send('put')
})
router.delete('/comment/:id', (req, res) => {
  res.send('Deleted')
})

export default router
