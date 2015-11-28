var BookView = Backbone.View.extend({
  tagName: "tr",
  className: "book-row",
  
  events: {
    "click .btn-edit": "editBook"
  },

  initialize: function() {
    this.listenTo(this.model, "change", this.update);
    //this.listenTo(this.model, "sync", this.update);
    this.render();
  },

  render: function() {
    var trHtml =  "<td>"+this.model.get("title")+"</td>"+
                  "<td>"+this.model.get("author")+"</td>"+
                  "<td><button class='btn btn-info btn-edit'>Edit</button></td>";
    this.$el.html(trHtml);
    return this;    
  },
  
  update: function(){
    console.log("Updating Book View....");
    this.render();
  },
  
  editBook: function(){
    var editBookView = new EditBookView({ model: this.model });
    editBookView.render();
  }
});
