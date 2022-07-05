import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Express } from 'express'
import * as path from 'path'
import execRouter from './router/exec'

const PORT = 8080

const app: Express = express()
app.use(cors())
app.use(bodyParser.text())
app.use(express.static(path.join(__dirname, '../web')))
app.use(execRouter)

app.listen(PORT, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${PORT}`)
})
