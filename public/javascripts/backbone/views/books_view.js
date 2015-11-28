var BooksView = Backbone.View.extend({
  tagName: "div",
  
  className: "books",
  
  el: "#books-div",

  events: {
  },

  initialize: function() {
  },
  
  render: function() {
    var tableHtml = "<div class='row'><div class='col-lg-4'><table class='table table-bordered'>"+
                    "<thead><tr>"+
                      "<th>Title</th>"+
                      "<th>Author</th>"+
                      "<th>Action</th>"+
                    "</tr></thead>"+
                    "<tbody id='tbody-books'>"+
                    "</tbody>"+
                    "</table></div><div class='col-lg-6' id='book-view'></div></div>";
    this.$el.html(tableHtml);
    this.renderBooks();
    return this;
  },
  
  renderBooks: function(){
    var booksView = this;
    booksView.$el.find('tbody').html("");
    this.model.each(function(book){
      var bookView = new BookView({ model: book });
      booksView.$el.find('tbody').append(bookView.$el);
    });    
  }
});
