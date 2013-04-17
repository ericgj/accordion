require('./rivets-shim.js');

var binder = require('rivets').bind
  , domify   = require('domify')
  , template = require('./template.js')

module.exports = AccordionView;

function AccordionView(model){
  if (!(this instanceof AccordionView)) return new AccordionView(model);
  this.el = domify(template)[0];
  this.model = model;
  binder(this.el, model);
};


