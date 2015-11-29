var Book = Backbone.Model.extend({
  paramRoot: 'book',
  
  idAttribute: "_id",
  
  defaults: {
    title: null,
    author: null,
    edition: null,
    status: "available"
  },
  
  initialize: function() {
    //console.log(this);
  },
  
  getAuthor: function(){
    return this.attributes.author;
  }
});

var BooksCollection = Backbone.Collection.extend({
  url: '/books',
  
  model: Book
});
