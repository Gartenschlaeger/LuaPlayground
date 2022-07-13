import * as child_process from 'child_process'
import express, { Request, Response } from 'express'

const router = express.Router()

router.post('/exec', (req: Request, res: Response) => {
    let tmp_stdout = ''
    let tmp_stderr = ''

    let source: string = req.body

    // fix: do not fail if source starts with - character
    source = 'os=nil;function debugTable(table) for k,v in pairs(table) do print(k, "=", v) end end;' + source

    const proc = child_process.spawn('lua', ['-e', source])
    proc.stdout.on('data', (d) => {
        tmp_stdout += d.toString()
    })
    proc.stderr.on('data', (d) => {
        tmp_stderr += d.toString()
    })
    proc.on('close', (code) => {
        res.json({
            c: code,
            o: code === 0 ? tmp_stdout : tmp_stderr
        })
    })
})

export default router
