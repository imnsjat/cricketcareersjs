const express = require('express');
const path = require('path');
const app = express();

const approutes = require('./routes/approutes');
app.use(approutes);


app.listen(3000);