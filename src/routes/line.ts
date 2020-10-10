import express from 'express'
import { middleware, lineBot } from '../controllers/lineController'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('LINE関係の機能を実装する予定です')
})

router.get('/hook', function (req, res, next) {
  res.render('index', { title: 'Express', message: 'Hello' })
})
router.post('/hook', middleware, (req, res, next) => lineBot(req, res, next))

export default router
