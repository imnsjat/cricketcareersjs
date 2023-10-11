const express = require('express');
const path = require('path');
const cors = require('cors');
const sequelize = require('./util/database')

const app = express();

app.use(express.json());
app.use(cors());

const approutes = require('./routes/approutes');

app.use(approutes);

sequelize.sync()
.then(()=>{
    app.listen(3000);
})
.catch(err=>console.log(err))
