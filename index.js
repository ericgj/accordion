var classes = require('classes')
  , Emitter = require('emitter')
  , noop    = function() { };

module.exports = Accordion;

defaults = {
  deselect:    true,
  multiselect: false
};

function Accordion(el,options) {
  if (!(this instanceof Accordion)) return new Accordion(el,options);

  options = merge(defaults, options || {})

  this.selectBehavior   = (options.multiselect ? noop : this.deselectAll);
  this.reselectBehavior = (options.deselect ? this._deselect : noop);
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
  panel.selected = true;
}

Accordion.prototype._deselect = function(panel){
  classes(panel.el).remove('selected');
  panel.selected = false;
}


function Panel(container,el) {
  if (!(this instanceof Panel)) return new Panel(container,el);
  
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
    this.container.reselectBehavior(this);
  } else {
    this.container.selectBehavior(this);
    this.container.emit('select', this);
  }
}

Panel.prototype.deselect = function(){
  this.container.emit('deselect', this);
}


var has = Object.prototype.hasOwnProperty;

var mergeInto = function(a,b){
  for (var key in b) {
    if (has.call(b,key)){
      a[key] = b[key];
    }
  }
  return a;
}

// non-mutating merge
var merge = function(a,b){
  var m = mergeInto({},a);
  return mergeInto(m,b);
}

