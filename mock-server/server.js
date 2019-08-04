const fs = require('fs')
const path = require('path')

const host = 'localhost'
const post = '3001'
const path_dbInit = path.join(__dirname, 'db.init.json')
const path_db = path.join(__dirname, 'db.json')

const initDb = () => {
  fs.writeFileSync(path_db, fs.readFileSync(path_dbInit).toString())
}
const day = 24 * 60 * 60 * 1000
initDb()
setInterval(() => {
  initDb()
}, day)

const jsonServer = require('json-server')
const server = jsonServer.create({ host })
const router = jsonServer.router(path_db)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use((req, res, next) => {
  log(req._remoteAddress, 
    req._startTime, 
    req.headers['user-agent'])
  next()
 })
server.use(router)
server.listen(post, () => {
  console.log(`
    JSON Server is running \n
    HomePage http://${host}:${post}
  `)
})

const path_log = path.join(__dirname, 'log.json')
if (!fs.existsSync(path_log)) {
  fs.writeFileSync(path_log, JSON.stringify({ request: [] }, null, 2))
}

const log = (ip = '', date, ua) => {
  fs.readFile(path_log, 'utf-8', (err, data) => {
    let jsonLog = JSON.parse(data)
    jsonLog.request.push({
      ip: ip.replace(/^\:\:ffff\:/, ''),
      date,
      ua
    })
    fs.writeFile(path_log, JSON.stringify(jsonLog, null, 2), err => {})
  })
}

const nowDate = () => {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  const d = now.getDate()
  return y + '-' + (m < 10 ? `0${m}` : m) + '-' +  (d < 10 ? `0${d}` : d)
}

const splitLogOneDay = () => {
  let path_log_copy = path.join(__dirname, `log${nowDate()}_${seed++}_${random}.json`)
  fs.readFile(path_log, 'utf-8', (err, data) => {
    let jsonLog = JSON.parse(data)
    fs.writeFileSync(path_log_copy, JSON.stringify(jsonLog, null, 2))
    fs.writeFile(path_log, JSON.stringify({ request: [] }, null, 2), err => {})
  })
}

let today = new Date(nowDate() + ' 24:00:00')
let delay = +today - +new Date()
let seed = 1
let random = Math.floor(Math.random() * 10000)
setTimeout(() => {
  splitLogOneDay()
  setInterval(() => {
    splitLogOneDay()
  }, delay)
}, day)

