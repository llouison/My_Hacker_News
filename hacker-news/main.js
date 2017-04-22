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

const newsUrl = 'https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty';

const articleBaseUrl = 'https://hacker-news.firebaseio.com/v0/item/' 

// fetching the news_url, converting it to json format, then calling the locate titles function
function getNewStories(){
  fetch(newsUrl)
  .then(function(response){
    response.json()
    .then(function(ids){
      locateTitles(ids);
    })
  })
}

// creating a for of loop that fetches each article using the id, converting it to json format, then calling the displaytitle function
function locateTitles(ids){
  for (let id of ids) {
    fetch(`${articleBaseUrl}${id}.json?print=pretty`)
    .then(function(response){
      response.json()
      .then(function(article){
        displayTitle(article)
      })
    })
  } 
}

// for each article, creating a new list item who's innerhtml is the title property in the json object and appending it to the storydiv to be displayed on the dom. Calling the displayinfo function on each title
function displayTitle(article){
  // console.log(article);
  const storyDiv = document.getElementById('story_titles');
  const title = document.createElement('li');
  title.innerHTML = article.title;
  storyDiv.appendChild(title);
  displayInfo(title, article);
}

// adding an event listener to each title that when clicked, displays the info and changes the color of the title 
function displayInfo(title, article){
  title.addEventListener('click', function() {
    // locating the elements in the document to add the article info to
    const articleTitle = document.getElementById('article_title');
    const articleScore = document.getElementById('article_score');
    const articleAuthor = document.getElementById('article_author');
    const articleLink = document.getElementById('article_link');
    // changing the innerhtml of each element with the article properties
    articleTitle.innerHTML = `Title: ${article.title}`;
    articleScore.innerHTML = `Score: ${article.score}`;
    articleAuthor.innerHTML = `Added by: ${article.by}`;
    articleLink.innerHTML = `Read this story here: <a href="${article.url}" target="_blank">${article.url}</a>`;
    title.style.color = '#828282';
  })
}

// calling the getNewStories function once the window loads 
window.onload = function() {
    getNewStories();
}