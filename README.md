Sony Admaxim Widgets
====================
JavaScript Widgets for Admaxim Builds

# Usage

## Release Date

Looks for an ID #release_date

```coffeescript
  require ["release_date/release"], (Release) ->
      @release = new Release("January 28, 2014")
```

Change the ID you want it to target:

```coffeescript
   @release = new Release("January 28, 2014", "NewID")
```

Delay Initialising Release code:

```coffeescript
   @release = new Release("January 28, 2014", undefined, false)
```

To initialise

```coffeescript
   @release.init()
```

## Tracking Code

Sets up tracking on button click

```coffeescript
  require ["utils/tracker"], (track) ->
    track("#myID or .class", "MyTrackingString")
```



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


# Optimisation

## For Images 
For PNG - http://tinypng.org/

Smush it - http://www.smushit.com/ysmush.it/


## Minify JS 

Please ensure all previxed files are [module name].min.js

Either download and set up the following

### Uglify (Requires Node and NPM):
https://github.com/mishoo/UglifyJS2

Install:
npm install uglify-js -g

Usage:
uglifyjs --o main.min.js main.js

### Other options

#### online  
Go to http://refresh-sf.com/yui/  

#### YUI:
Download (Requires Java) - http://yui.github.io/yuicompressor/
