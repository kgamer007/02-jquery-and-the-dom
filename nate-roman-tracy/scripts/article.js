'use strict';

let articles = [];

// DONE: What is the purpose of the following function? Why is its name capitalized? Explain the context of "this" within the function. What does "rawDataObj" represent?
// This function is known as a constructor. It's purpose is to generate new instances of objects. It is convention to capiotolize Constructors.

function Article (rawDataObj) {
  // DONE: Use the JS object that is passed in to complete this constructor function:
  // Save ALL the properties of `rawDataObj` into `this`
  this.title = rawDataObj.title;
  this.category = rawDataObj.category;
  this.author = rawDataObj.author;
  this.authorUrl = rawDataObj.authorUrl;
  this.publishedOn = rawDataObj.publishedOn;
  this.body = rawDataObj.body;
}

Article.prototype.toHtml = function() {
  // DONE: What is the benefit of cloning the article? (see the jQuery docs)
  // This allows us to use the article as a template from which we can clone and repopulate, rather than generate new elements every time.

  let $newArticle = $('article.template').clone();
  /* DONE: This cloned article still has a class of template. In our modules.css stylesheet, we should give all elements with a class of template a display of none so that our template does not display in the browser. But, we also need to make sure we're not accidentally hiding our cloned article. */
  $newArticle.addClass('clearfix');
  $newArticle.removeClass('template');

  if (!this.publishedOn) $newArticle.addClass('draft');
  $newArticle.attr('data-category', this.category);

  /* DONE: Now use jQuery traversal and setter methods to fill in the rest of the current template clone with values of the properties of this particular Article instance.
    We need to fill in:
      1. author name,
      2. author url,
      3. article title,
      4. article body, and
      5. publication date. */

  $newArticle.find('a').text(this.author);
  $newArticle.find('a').attr('href', this.authorUrl);
  $newArticle.find('h1').text(this.title);
  $newArticle.find('section.article-body').html(this.body);
  $newArticle.find('time').attr('datetime' , this.publishedOn);
  // DONE: Display the date as a relative number of 'days ago'
  $newArticle.find('time').html(`about ${parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000)} days ago`);
  $newArticle.append('<hr>');
  return $newArticle;
};

$(function() {
  rawData.sort(function(a,b) {
    // DONE: Take a look at this sort method; This may be the first time we've seen it. Look at the docs and think about how the dates would be sorted if the callback were not included in this method.
    return (new Date(b.publishedOn)) - (new Date(a.publishedOn));
  });

  // DONE: Refactor these for loops using the .forEach() array method.

  rawData.forEach(function(obj) {
    articles.push(new Article(obj));
  });

  articles.forEach(function(obj) {
    $('#articles').append(obj.toHtml());
  });

});