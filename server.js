'use strict';

require('dotenv').config();
require('ejs');

const express = require('express');
const superagent = require('superagent');

const app = express();
let port = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static('.public'));
app.use(express.urlencoded({extended : true}));


app.listen(port, () => {
  console.log('Server is listening on port', port);
});



