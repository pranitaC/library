var EditBookView = Backbone.View.extend({
  tagName: "div",
  
  className: "edit-book",
  
  el: '#book-view',
  
  events: {
    "click .btn-update": "updateBook"
  },

  initialize: function() {
  },

  render: function() {
    console.log("Edit book...");
    var editBookHtml =
                      "<h2>Edit Book</h2>"+ 
                      "<div class='row top-buffer'>"+
                        "<div class='col-lg-2'><label>Title:</label></div>"+  
                        "<div class='col-lg-2'><input value='"+this.model.get('title')+"' type='text' class='title-field'/></div>"+  
                      "</div>"+
                      "<div class='row top-buffer'>"+
                        "<div class='col-lg-2'><label>Author:</label></div>"+  
                        "<div class='col-lg-2'><input value='"+this.model.get('author')+"' type='text' class='author-field'/></div>"+  
                      "</div>"+
                      "<div class='row top-buffer'>"+
                        "<div class='col-lg-2'></div>"+  
                        "<div class='col-lg-2'><button class='btn btn-warning btn-update'>Update</button></div>"+  
                      "</div>";
    this.$el.html(editBookHtml);
    return this;
  },
  
  updateBook: function(){
    this.model.save({
      title: this.$el.find('.title-field').val(), 
      author: this.$el.find('.author-field').val() 
    }, { 
      wait: true,
      success: function(model, response, options) {
        console.log("Book updated successfully....");
      },
      error: function(model, response, options) {
      }
    });
  }
});
