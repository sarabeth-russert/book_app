'use strict';

require('dotenv').config();
require('ejs');

const { response } = require('express');
const express = require('express');
const superagent = require('superagent');

const app = express();
let port = process.env.PORT;

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(express.urlencoded({extended : true}));

app.get('/', renderHomePage);
app.get('/search', renderSearchPage);


function renderHomePage(request, response) {
  response.render('pages/index');
}

function renderSearchPage(request,response) {
  response.render('pages/searches/new.ejs');
}
app.listen(port, () => {
  console.log('Server is listening on port', port);
});



