const express = require('express')
const cors = require('cors')
const { spawn, exec } = require('node:child_process')
const child_process = require('child_process')
const bodyParser = require('body-parser')
const { stdout } = require('node:process')

const api = express();

const PORT = 80;

api.use(cors())
api.use(bodyParser.text());

api.post('/exec', (req, res) => {
    console.log('req', req.body)

    let tmp_stdout = '';
    let tmp_stderr = '';

    const proc = child_process.spawn('lua', ['-e', req.body]);
    proc.stdout.on('data', (d) => {
        //console.log('STDOUT', d.toString())
        tmp_stdout += d.toString()
    })
    proc.stderr.on('data', (d) => {
        //console.log('STDERR', d)
        tmp_stderr += d.toString()
    })

    proc.on('close', (code) => {
        console.log('CLOSE', code)
        console.log('OUTPUT: "' + tmp_stdout + '"')

        res.json({
            c: code,
            o: code === 0 ? tmp_stdout : tmp_stderr
        })
    })
});

api.listen(PORT, () => {
    console.log(`API is listening on Port ${PORT}.`)
})
