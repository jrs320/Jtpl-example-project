const fs = require('fs')
const path = require('path')

// const host = '192.168.1.101'
const host = 'localhost'
const post = '3001'

const path_dbInit = path.join(__dirname, 'db.init.json')
const path_db = path.join(__dirname, 'db.json')

fs.writeFileSync(path_db, fs.readFileSync(path_dbInit).toString())

const jsonServer = require('json-server')
const server = jsonServer.create({ host })
const router = jsonServer.router(path_db)
const middlewares = jsonServer.defaults()

server.use(middlewares)
server.use(router)
server.listen(post, () => {
  console.log(`
    JSON Server is running \n
    HomePage http://${host}:${post}
  `)
})
