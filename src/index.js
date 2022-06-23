const express = require('express')
const cors = require('cors')
const child_process = require('child_process')
const bodyParser = require('body-parser')
const path = require('path')

const PORT = 8080;

const app = express();

app.use(cors())
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, '../web')))

app.post('/exec', (req, res) => {
    //console.log('req', req.body)

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
        //console.log('CLOSE', code)
        //console.log('OUTPUT: "' + tmp_stdout + '"')
        res.json({
            c: code,
            o: code === 0 ? tmp_stdout : tmp_stderr
        })
    })
});

app.listen(PORT, () => {
    console.log(`API is listening on Port ${PORT}.`)
})
