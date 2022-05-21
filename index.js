const express = require('express');
const cors = require('cors');
const app = express()
const port = process.PORT || 5000

app.use(cors())
app.use(express.json())


app.get('https://motor-parts-263.herokuapp.com/', (req, res) => {
    res.send('Welcome! Motor Parts Manufacturing Website')
})





app.listen(port)