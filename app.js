const express = require('express');
const path = require('path');
const app = express();
const automator = require('./automator')
const cors = require('cors')

app.use(express.static(path.join(__dirname, './public')));
app.use(cors())
app.use(automator)

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(7000, () => {
    console.log("server is running")
})