import express from 'express'
import { guess } from '../../src/axios'
import getNumber from '../core/getNumber'

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}

// nothing needed to do here, just getNumber to set a number.
router.post('/start', (_, res) => {
  getNumber(true)

  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)

  if (guessed !== 0 && !guessed) {
    res.status(500).send({ msg: 'No number provided.' })
  }

  // TODO: checked if number and guessed are the same, response with some hint
  else if(number===guessed){
    res.status(200).send({ msg: 'equal' })
  }
  else if(number<guessed){
    res.status(200).send({ msg: 'smaller' })
  }
  else if(number>guessed){
    res.status(200).send({ msg: 'bigger' })
  }
})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  getNumber(true)

  res.json({ msg: 'The game has restarted.' })
})

export default router
