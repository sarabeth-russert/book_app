'use strict';

require('dotenv');
require('ejs');

const express = require('express');
const superagent = require('superagent');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('.public'));
app.use(express.urlencoded({extended : true}));



