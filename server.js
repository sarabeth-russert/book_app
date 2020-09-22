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
app.post('/searches', getBookData);
app.get(`*`, handleError);

function getBookData (request, response) {
  const searchQuery = request.body.search[0];
  const searchType = request.body.search[1];
  let url = 'https://www.googleapis.com/books/v1/volumes?q=';
  if(searchType === 'title'){ url += `+intitle:${searchQuery}`}
  if(searchType === 'author'){ url += `+inauthor:${searchQuery}`}
  console.log(request.body)
  superagent.get(url)
    .then(data => {
      const bookArray = data.body.items;
      const finalBookArray = bookArray.map(book => new Book(book.volumeInfo));
      console.log(finalBookArray);
      response.render('pages/searches/show', {finalBookArray: finalBookArray});
    })
    .catch(() => {
      response.status(500).send('Something went wrong with your location with your superagent location');
      console.log(url);
    })

}

function renderHomePage(request, response) {
  response.render('pages/index');
}

function renderSearchPage(request,response) {
  response.render('pages/searches/new.ejs');
}

function handleError (request, response) {
  response.status(404).send('Page Not Found!');
} 

function Book(volumeInfo) {
  this.url = volumeInfo.imageLinks ? volumeInfo.imageLinks.smallThumbnail: `https://i.imgur.com/J5LVHEL.jpg`;
  this.title = volumeInfo.title ? volumeInfo.title: ` Title Unavailable!`;
  this.author = volumeInfo.authors ? volumeInfo.authors[0]: `Author Unavailable!`;
  this.description = volumeInfo.description ? volumeInfo.description: `Description Not Found!?`;
  
}





app.listen(port, () => {
  console.log('Server is listening on port', port);
});



