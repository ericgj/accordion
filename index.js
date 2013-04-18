
module.exports = Accordion;

function Accordion(el) {
  if (!(this instanceof Accordion)) return new Accordion(el);

  this.panels = [];
  this.el = el;
  if (el) this.bind(el);
  return this;
}

Accordion.prototype = new Emitter();

Accordion.prototype.bind() = function(el){
    
}


function Panel(container,el) {
  if (!(this instanceof Panel)) return new Panel(el);
  
  this.container = container;
  this.el = el;
  this.selected = false;

  if (el) this.bind(el);
  return this;
}

Panel.prototype = new Emitter();

Panel.prototype.bind = function(el){
  article = domify(el)[0];
  article.onclick = this.select.bind(this);
}

Panel.prototype.select = function(){
  if (this.selected){
    this.container.collapseBehavior(this);
  } else {
    this.selected = true;
    this.container.emit('select', this);
  }
}

Panel.prototype.deselect = function(){
  this.selected = false;
  this.container.emit('deselect', this);
}
