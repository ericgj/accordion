'use strict';

var classes = require('classes')
  , Emitter = require('emitter')
  , noop    = function() { }
  , has = hasOwnProperty

module.exports = Accordion;

/*
 * Example usage:
 *
 *    var accordion = 
 *      Accordion()
 *        .multiselectable(true)
 *        .deselectable(true)
 *        .hlevel(3)
 *
 *    var a = accordion(el);
 *    a.on('select', anotherfn);
 *    a.deselectAll();
 *
 *    // overwrite options
 *    a.multiselectable(false);
 *
 */
function Accordion(){
  if (arguments.length > 0){
    var args = []; for (var i=0;i<arguments.length;++i) args.push(arguments[i]);
    return shim.apply(null,args);
  }
  
  var opts = {
    multiselectable: false,
    deselectable:    true,
    hlevel:          null
  }

  accordion.multiselectable = function(bool){
    opts.multiselectable = bool;
    return this;
  }

  accordion.deselectable = function(bool){
    opts.deselectable = bool;
    return this;
  }

  accordion.hlevel = function(lvl){
    opts.hlevel = lvl;
    return this;
  }

  function accordion(el){
    if (typeof el=='string') el = document.querySelector(el);
    var items = el.querySelectorAll('.hentry');

    // if accordion structure not already created, generate
    // and add 'accordion' to class of el

    if (opts.hlevel && items.length == 0){    
      gen(el, opts.hlevel);
      classes(el).add('accordion');
      items = el.querySelectorAll('.hentry');
    }

    // set panels options
    var panels = 
      Panels()
        .multiselectable(opts.multiselectable)
        .deselectable(opts.deselectable)

    // bind events
    return panels(items);
  }

  return accordion;

}

function Panels(){
  var items = [];
  var emitter = new Emitter();

  panels.multiselectable = function(bool){
    opts.select   = (bool ? noop : this.deselectAll.bind(this))
    return this;
  }

  panels.deselectable = function(bool){
    opts.reselect = (bool ? this.deselect.bind(this) : noop)
    return this;
  }

  panels.click = function(i,e){
    var item = items[i]
    if (this.selected(i)){
      opts.reselect(i,e); // reselect behavior, e.g. deselect
    } else {
      opts.select(i);     // select pre-behavior, e.g. deselectAll
      this.select(i,e);   // select
    }
    return this;
  }
 
  panels.select = function(i,e){
    var item = items[i]
    classes(item).add('selected');
    emitter.emit('select', item, i, e);
  }

  panels.deselect = function(i,e){
    var item = items[i]
    classes(item).remove('selected');
    emitter.emit('deselect', item, i, e);
  }

  panels.selected = function(i){
    var item = items[i]
    return item && classes(item).has('selected');
  }

  panels.selectAll = function(){
    for (var i=0;i<items.length;++i){
      this.select(i);
    }
    return this;
  }

  panels.deselectAll = function(){
    for (var i=0;i<items.length;++i){
      this.deselect(i);
    }
    return this;
  }

  panels.on = function(name,fn){
    emitter.on(name,fn);
    return this;
  }

  var opts = {
    select:   panels.deselectAll.bind(panels),
    reselect: noop
  }

  function panels(els){
    items = [];
    for (var i=0;i<els.length;++i) items.push(els[i]);
    items.forEach( function(el,i){
      var title = el.querySelector('.entry-title')
      if (title) title.onclick = function(e){ panels.click(i,e); }
    })
    return panels;
  }

  return panels;
}


// shim for old-style constructor

function shim(el,options){
  console.warn(
    'Accordion constructor arguments may be deprecated by v0.2.x. ' +
    'Please refer to the new API.'
  );
  
  var opts = {
    multiselectable: options.multiselectable || options.multiselect,
    deselectable: options.deselectable || options.deselect,
    hlevel: options.hlevel
  }

  var accordion = Accordion();
  for (var k in opts){
    if (!(opts[k] == undefined)) accordion = accordion[k](opts[k]);
  }

  return accordion(el);
}



// utils
// TODO extract this into separate component

function hlevel(el){
  return {
    'H1': 1,
    'H2': 2,
    'H3': 3,
    'H4': 4,
    'H5': 5,
    'H6': 6
  }[el.nodeName];
}

function siblingEl(el){
  if (has.call(el,'nextElementSibling')){
    return el.nextElementSibling;
  } else {
    var e = el.nextSibling;
    while (e && !(e.nodeType == 1)) e = e.nextSibling;
    return e;
  }
}

function gen(container,lvl){

  var sel = container.querySelectorAll('h'+lvl)
    , heads = []
  for (var i=0;i<sel.length;++i) heads.push(sel[i]);
  var sections = heads.map( function(head){
    var el = head
      , els = [head]
    while (el = siblingEl(el)){
      var ellvl = hlevel(el)
      if (ellvl && ellvl <= lvl) break;
      els.push(el);
    }
    return els;
  })
  
  sections.forEach( function(els){
    var title = els[0]
    classes(title).add('entry-title');
    if (!title.querySelector('.caret')) {
      var caret = document.createElement('span');
      classes(caret).add('caret');
      title.insertBefore(caret,title.firstChild);
    }

    var contents = els.slice(1)
    var div = document.createElement('div')
    classes(div).add('entry-content');
    for (var i=0;i<contents.length;++i) div.appendChild(contents[i]);

    var hentry = document.createElement('div')
    classes(hentry).add('hentry');

    title.parentNode.insertBefore(hentry,title);

    hentry.appendChild(title);
    hentry.appendChild(div);

  })

}

