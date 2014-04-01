
# Accordion

  Simple (vertical) accordion UI component

  <img alt="Example" src="http://i.imgur.com/KF8uNcR.png" />

  See `test/index.html` for example usage.
  
## Installation

    $ component install ericgj/accordion

## Usage

  There are two ways you can use this component to attach to the DOM.

  1. _Passive_: No changes are made to the document structure; your document
  already provides the necessary structure under the given element (see
  below). This is the default. For example:

  ```js
  // set options
  var accordion = Accordion()
                    .multiselectable(true);
  
  // binding
  var panels = accordion(el);
  
  // programmatic manipulation
  panels.deselectAll();
  panels.click(0);
  ```

  2. _Active_: Your document is converted to the necessary structure under
  the given element, based on header tags (h1, h2, h3, etc).

  ```js
  // set options
  var accordion = Accordion()
                    .deselectable(false)
                    .hlevel(3);
  
  // convert structure and binding
  var panels = accordion('#container');
  
  // semantic event hooks
  panels.on('select', function(el,i,e){
    if (e) window.scrollTo(0, e.pageY - 20);
  });
  ```

  The `hlevel` specifies that any _h3 sections_ will be converted for use as
  accordion panels. (Note that it detects if the DOM conversion has already
  been done, so it is safe to re-bind an accordion to the same containing
  element).  More about this below.

  This is useful if you have a flat document structure, but want to use the
  `h*` elements as semantic markers for accordion panels. For instance,
  this is the kind of structure typically generated from markdown documents.


## API

  __Please note that the API has changed quite a bit from earlier 0.0.x 
  versions. The old version can be found on the `original` git branch.__
  
### Accordion()

  Creates an _accordion function_ that can then be used multiple times
  on container elements you want to treat as accordions. Options are set
  directly on this function.

### accordion.multiselectable({Boolean})

  If true, allows expansion of more than one panel at a time (default false).

### accordion.deselectable({Boolean})

  If true, allows collapse of selected panels (default true).

### accordion.hlevel({Integer})

  Convert all sections of elements under given header level into [hAtom][hatom]
  structure, before binding accordion. For instance, if `accordion.hlevel(3)`,
  then all h3's are interpreted as _accordion panel headers_, and elements
  below them as _accordion panel contents_.  
  
  For example a flat structure like:

  ```html
  <h1>Title</h1>
  <h2>subtitle</h2>
  <p>Introductory paragraph.</p>
  <h3>First item</h3>
  <p>Description of the first item.</p>
  <p>Any number of elements.</p>
  <h2>New section</h2>
  <h3>Second item</h3>
  <p>Any number of elements.</p>
  ```

  becomes:

  ```html
  <h1>Title</h1>
  <h2>subtitle</h2>
  <p>Introductory paragraph.</p>
  <div class="hentry">
    <h3 class="entry-title">
      <span class="caret"></span>
      First item
    </h3>
    <div class="entry-content">
      <p>Description of the first item.</p>
      <p>Any number of elements.</p>
    </div>
  </div>
  <h2>New section</h2>
  <div class="hentry">
    <h3 class="entry-title">
      <span class="caret"></span>
      Second item
    </h3>
    <div class="entry-content">
      <p>Any number of elements.</p>
    </div>
  </div>
  ```

### accordion({String|Element})

  Attach accordion (and optionally convert structure) under given container
  el or (document) selector.  In other words, bind click events to `.hentry
  .entry-title` elements within container.

  Returns a `panels` object which allows programmatic manipulation of
  accordion and `select`, `deselect` event hooks, see below.


### panels.select({Integer})

  Select (expand) given panel.

### panels.deselect({Integer})

  Deselect (collapse) given panel.

### panels.selectAll()

  Select (expand) all panels.
  
### panels.deselectAll()

  Deselect (collapse) all panels.
 
### panels.selected({Integer})

  True if given panel is currently selected, false if not.

### panels.click({Integer})

  Programmatically click given panel, triggering multiselectable/deselectable
  behavior.

### panels.on({String},{Function})

  Define callback on `select` or `deselect` events. Callbacks are passed the 
  panel (.hentry) element, the panel index, and the DOM click event. (Note 
  that for programmatic select and deselect, the DOM event is undefined.)
 
## Events

  See `panels.on` above.

## License

  MIT


[hatom]: http://microformats.org/wiki/hatom  "hAtom Microformat Spec"

