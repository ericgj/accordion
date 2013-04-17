var Emitter = require('emitter'),
    react   = require('react')

module.exports = Accordion;

Behaviors = {
  panel: {
    deselect: function(p){ p.deselect() },
    noop: function(){}
  }
};

function Accordion(opts) {
  opts = opts || {}
  this.collapseBehavior = 
    opts.unselectable ? 
      Behaviors.panel.deselect :
      Behaviors.panel.noop

  this.panels = [];
  return this;
};

Accordion.prototype = new Emitter();

Accordion.prototype.add = function(){
  this.panels.push( new Panel(this) );
  return this;
};

Accordion.prototype.deselect = function(){
  this.panels.forEach(function(button){
    button.deselect();
  });
  return this;
};


function Panel(container) {
  this.container = container;
  this.selected = false;
  return react(this);
}

Panel.prototype.select = function(){
  if (this.selected){
    this.container.collapseBehavior(this);
  else {
    this.selected = true;
    this.container.emit('select', this);
  }
};

Panel.prototype.deselect = function(){
  if (!(this.selected)) return;
  this.selected = false;
  this.container.emit('deselect', this);
};

