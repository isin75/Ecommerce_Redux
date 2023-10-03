import express from 'express'
import path from 'path'
import cors from 'cors'
import sockjs from 'sockjs'
import cookieParser from 'cookie-parser'
import axios from 'axios'

import config from './config'
import Html from '../client/html'

const { readFile } = require('fs').promises

require('colors')

let connections = []

const port = process.env.PORT || 8090
const server = express()

const middleware = [
  cors(),
  express.static(path.resolve(__dirname, '../dist')),
  express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }),
  express.json({ limit: '50mb', extended: true }),
  cookieParser()
]

middleware.forEach((it) => server.use(it))

server.get('/', (req, res) => {
  res.send(`
    <h2>This is SkillCrucial Express Server!</h2>
    <h3>Client hosted at <a href="http://localhost:8087">localhost:8087</a>!</h3>
  `)
})

server.get('/api/v1/goods', async (req, res) => {
  try {
    const getGoods = await readFile(`${__dirname}/data/data.json`, { encoding: 'utf-8' }).then((data) => JSON.parse(data))
    res.json(getGoods)
  } catch (error) {
    res.json({ status: '404', description: "no data"})
  }
})

server.get('/api/v1/currency', async (req, res) => {
  try {
    const apiUrl =
      'http://apiы.exchangerateы.hostы/latest?access_key=08d45ce49e57a9e1806b2fb63f795e06&format=1&base=EUR&symbols=USD,EUR,CAD'
    const currency = await axios(apiUrl).then((resp) => resp.data)
    res.json(currency)
  } catch (error) {
    res.json({
      success: true,
      timestamp: 1696249323,
      base: 'EUR',
      date: '2023-10-02',
      rates: {
        USD: 1.053313,
        EUR: 1,
        CAD: 1.434244
      }
    })
  }
})

server.get('/api/v1/goods/:type/:direction', async (req, res) => {
  const { type, direction } = req.params
  try {
    const getGoods = await readFile(`${__dirname}/data/data.json`, { encoding: 'utf-8' }).then(
      (data) => JSON.parse(data)
    )
    const sortedList = getGoods.sort((a, b) => {
      if (direction === 'min') {
        return type === 'price' ? a.price - b.price : a.title.localeCompare(b.title)
      }
      if (direction === 'max') {
        return type === 'price' ? b.price - a.price : b.title.localeCompare(a.title)
      }
      return a.price - b.price
    })
    res.json(sortedList)
  } catch (error) {
    res.json({ status: '404', description: 'no data' })
  }
})

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

const app = server.listen(port)

if (config.isSocketsEnabled) {
  const echo = sockjs.createServer()
  echo.on('connection', (conn) => {
    connections.push(conn)
    conn.on('data', async () => {})

    conn.on('close', () => {
      connections = connections.filter((c) => c.readyState !== 3)
    })
  })
  echo.installHandlers(app, { prefix: '/ws' })
}
console.log(`Serving at http://localhost:${port}`)
