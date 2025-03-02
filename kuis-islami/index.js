const express = require('express');
const app = express();
app.use(express.static(__dirname + '/public'))
const port = 3000
app.listen(port, () => {
    console.log(`Web server started`)
})
