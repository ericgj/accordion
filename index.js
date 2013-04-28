var classes = require('classes')
  , Emitter = require('emitter')

module.exports = Accordion;

function Accordion(el) {
  if (!(this instanceof Accordion)) return new Accordion(el);

  this.panels = [];
  this.el = el;
  this.on('select', this._select.bind(this));
  this.on('deselect', this._deselect.bind(this));
  if (el) this.bind(el);
  this.deselectAll();
  return this;
}

Accordion.prototype = new Emitter;

Accordion.prototype.bind = function(el){
  if (typeof el=='string') el = document.querySelector(el);
  items = el.querySelectorAll('.hentry');
  for (i=0;i<items.length;++i) {
    this.panels.push(new Panel(this, items[i]));
  }
  classes(el).add('accordion');
  return this;
}

Accordion.prototype.deselectAll = function(){
  for (i=0;i<this.panels.length;++i) {
    this._deselect(this.panels[i])
  }
  return this;
}

Accordion.prototype._select = function(panel){
  classes(panel.el).add('selected');
}

Accordion.prototype._deselect = function(panel){
  classes(panel.el).remove('selected');
}


function Panel(container,el) {
  if (!(this instanceof Panel)) return new Panel(el);
  
  this.container = container;
  this.el = el;
  this.selected = false;
  if (el) this.bind(el);
  return this;
}

Panel.prototype.bind = function(el){
  title = el.querySelector('.entry-title');
  title.onclick = this.select.bind(this);
}

Panel.prototype.select = function(){
  if (this.selected){
    // TODO this.container.collapseBehavior(this);
    this.deselect();
  } else {
    this.selected = true;
    this.container.emit('select', this);
  }
}

Panel.prototype.deselect = function(){
  this.selected = false;
  this.container.emit('deselect', this);
}
