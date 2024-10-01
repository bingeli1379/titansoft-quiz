import express from 'express'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

function wait(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

const CODE = '1234'
const TOKEN = 'example_token'

app.post('/api/verify', async (req, res) => {
  await wait(1000)

  if (req.body.code !== CODE) {
    res.send({
      valid: false
    })
    return
  }

  res.send({
    valid: true,
    token: TOKEN
  })
})

app.get('/api/auth', async (req, res) => {
  await wait(1000)

  if (req.headers.authorization !== TOKEN) {
    res.send({
      message: 'unauthorized'
    })
    return
  }

  res.send({
    username: 'Homer Simpson',
    quote: '“I believe the children are the future... Unless we stop them now!”',
    photo: 'https://upload.wikimedia.org/wikipedia/zh/b/bd/Homer_Simpson.png?20120815071902'
  })
})

app.listen(3000)
