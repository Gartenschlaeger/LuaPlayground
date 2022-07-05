import bodyParser from 'body-parser'
import * as child_process from 'child_process'
import cors from 'cors'
import express, { Express, Request, Response } from 'express'
import * as path from 'path'

const PORT = 8080

const app: Express = express()

app.use(cors())
app.use(bodyParser.text())
app.use(express.static(path.join(__dirname, '../web')))

app.post('/exec', (req: Request, res: Response) => {
    let tmp_stdout = ''
    let tmp_stderr = ''

    const proc = child_process.spawn('lua', ['-e', req.body])
    proc.stdout.on('data', (d) => {
        tmp_stdout += d.toString()
    })
    proc.stderr.on('data', (d) => {
        tmp_stderr += d.toString()
    })
    proc.on('close', (code) => {
        res.json({
            c: code,
            o: code === 0 ? tmp_stdout : tmp_stderr,
        })
    })
})

app.listen(PORT, () => {
    console.log(`⚡️ [server]: Server is running at http://localhost:${PORT}`)
})
