console.log('what\'s new in Hackernews?');

/*
1. When the page loads
  - make a fetch request to get the top 500 newest articles on hackernews
     !!!HINT!!! READ THE DOCUMENTATION! https://github.com/HackerNews/API
2. When the response is fulfilled
  - loop through the response
  - make a fetch call for each item
  - append each item's information to the list of articles
    !!!HINT!!! maybe you need a list of some kind in your html... maybe
*/

const news_url = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';

const article_url = 'https://hacker-news.firebaseio.com/v0/item/' 

const itemId = 14173021;

function getNewArticles(){
  fetch(news_url)
    .then(function(response){
      response.json()
      .then(function(titles){
        displayTitles(titles);
      })
  })
}

function displayTitles(titles){
  for (let title of titles) {
    fetch(`${article_url}${title}.json?print=pretty`)
    .then(function(response){
      response.json()
      .then(function(article){
        console.log(article)
      })
    })
  } 
}


window.onload = function() {
    getNewArticles();
    // displayTitles();
}