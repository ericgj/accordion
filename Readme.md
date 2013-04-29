
# Accordion

  Basic (vertical) accordion component

  <img alt="Example" src="http://i.imgur.com/KF8uNcR.png" />

  See `test/index.html` for example usage.
  
## Installation

    $ component install ericgj/accordion

## Events

  - `select(panel)`    when an accordion panel is selected
  - `deselect(panel)`  when an accordion panel is deselected

## API
  
### Accordion(el, options)

  Creates a new `Accordion` bound to the given DOM element or selector.

  It makes the following assumptions about the markup:
  
  1. The given element contains one or more [hAtom][1] entries. That is,
  `div` or `article` elements matched by `.hentry`.

  2. Each entry has an `.entry-title` element (again following hAtom),
  which is used as the accordion header. Typically this would be an
  `h3` etc, but could also be a `header` that contains several inline-
  block elements, etc.

  3. If you want a `caret` (CSS arrow), for convenience the built-in CSS
  includes styles for this. Simply include a `<span class="caret"></span>`
  within your `.entry-title` element.

  The following options are available:

  - `deselect {Boolean}`    allows collapse of selected panel (default true)
  - `multiselect {Boolean}` allows expansion of more than one panel (default false)

### Accordion#select(panel)

  Programmatically select (expand) given panel

### Accordion#deselect(panel)

  Programmatically deselect (collapse) given panel

### Accordion#deselectAll

  Deselect all panels
  

## License

  MIT
