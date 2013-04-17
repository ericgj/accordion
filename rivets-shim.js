var Rivets  = require('rivets')
  , css     = require('css')
  , classes = require('classes')

// config for react-style models

Rivets.configure({

  adapter: {
    subscribe: function(obj,keypath,cb){
      obj.on('change '+keypath,cb)
    },
    unsubscribe: function(obj,keypath,cb){
      obj.off('change '+keypath,cb)  
    },
    read: function(obj,keypath){
      return obj[keypath];  
    },
    publish: function(obj,keypath,value){
      obj[keypath]=value;
    }
  }

});

// non-jQuery binders 

Rivets.binders.show = function(el,value){
  css(el, {display: (!!value ? '' : 'none')});
};

Rivets.binders.hide = function(el,value){
  css(el, {display: (!!value ? 'none' : '')});
};

Rivets.binders['class-*'] = function(el,value){
  classes(el)[(!!value ? 'add' : 'remove')](this.args[0]);
};

// custom binders

Rivets.binders.selected = function(el,value){
  classes(el)[(!!value ? 'add' : 'remove')]('selected');
};


