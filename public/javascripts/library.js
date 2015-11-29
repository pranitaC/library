//var book = new Book("Physics","Einstein","1");
//console.log(book.getAuthor());
var booksView = null;
var books = new BooksCollection();
books.fetch({
  success: function(collection, response, options){
    console.log("Success getting books: ");
    console.log(collection);
    booksView = new BooksView({ model: books });
    booksView.render();
  },
  error: function(collection, response, options){
    console.log("Error while getting books: ");
    console.log(response);
  }
});

function createBook(title, author, edition){
  var book = new Book();
  book.set({
    title: title,
    author: author,
    edition: edition
  });
  booksView.model.create(book, { wait: true });
}

//createBook();
