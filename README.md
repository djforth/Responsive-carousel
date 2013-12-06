Responsive-carousel
===================

A responsive carousel example using Require, CoffeeScript and Compass

# Requirements


## JavaScript
All JS written in CoffeeScript - http://coffeescript.org/

All JS Tested using Jasmine - http://pivotal.github.io/jasmine/

Set up using RequireJS and AMD methodology - http://www.requirejs.org/

Underscore a Dependancy - http://underscorejs.org/

## CSS:
Written in SCSS - http://sass-lang.com/

Using Compass - http://compass-style.org/help/

```bash
 compass watch
```

# CoffeeScript set up

To install CoffeeScript first install node (would recommend Homebrew for this), then follow http://coffeescript.org/#installation

To compile Javascript files as changing run from root folder:

### Main JS
In terminal:
> coffee -o assets/javascripts/ -cw assets/preproccessed_files/coffeescript/

### Tests
From Tests folder:
> coffee -o specs/ -cw specs/coffeescript/

