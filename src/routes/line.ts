import express from 'express'
import {middleware, lineBot} from '../controllers/lineController'
const router = express.Router();

/* GET home page. */
router.get('/hook', function(req, res, next) {
  res.render('index', { title: 'Express', message: 'Hello' });
});

router.post("/", (middleware), (req, res, next) => lineBot(req, res, next));
router.get("/", (req, res) => {
  res.send("This endpoint is /hook. your request method is GET");
});

export default router
