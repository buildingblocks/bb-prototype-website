![Building Blocks](https://github.com/buildingblocks/bb-prototype-website/raw/master/src/assets/images/bb-logo.png "Building Blocks")

# bb-prototype-website [![Build Status][travis-image]][travis-url]

> Front-end website prototype template.

## Using the template

First things first, install [Node.js](http://nodejs.org).

If you don't have [Bower](http://bower.io) installed locally, install it via npm:

```sh
npm install -g bower
```

Once you have the project downloaded, install all NPM and Bower packages:

```sh
npm install
```

Note:
* You shouldn't need to run `bower install` now as it's done via a __postinstall__ hook after `npm install` has finished

Once this finishes running, you can build and serve the project by running the Grunt task:

```sh
grunt server
```

Note:
* Do not edit files in the grunt generated __/dist__ directory (these will always be deleted)

<!-- You can also use our [Yeoman generator](https://github.com/buildingblocks/generator-bb-prototype-website).  [TODO: Finish the generator] -->

## Updating the template
When you make changes to the build process please run `npm test` before pushing. 

If creating a [pull request](https://github.com/buildingblocks/bb-prototype-website/pulls), make sure the Travis build has passed before submitting it (this is shown when you initiate the request).


## Adding packages
When you install any new Node packages use the command:

```sh
npm install <package> --save-dev
```

When you install any new Bower packages use the command:

```sh
bower install <package> --save-dev
```

## Updating dev dependencies in `package.json`
[![devDependency Status][dev-dependency-image]][dev-dependency-url]

To report what dev dependencies need updating use the command:

```sh
grunt devUpdate:report
```

To be prompted before updating each dev dependency use the command:

```sh
grunt devUpdate:prompt
```

To force update all dev dependencies use the command:

```sh
grunt devUpdate:force
```

Notes:

* Add new frameworks/libraries as `devDependencies` as they get compiled and moved for production during the build process
* Remember to keep packages updated as needed
* However, do not update jQuery to 2.x unless you are dropping support for Internet Explorer 6, 7, and 8 [(see here)](http://blog.jquery.com/2013/04/18/jquery-2-0-released/#content)

* * * 

### What is [Grunt](http://gruntjs.com)?

In one word: automation. The less work you have to do when performing repetitive tasks like minification, compilation, unit testing, linting, etc, the easier your job becomes. After you've configured it, a task runner can do most of that mundane work for you—and your team—with basically zero effort.

[Find out more at the Grunt website](http://gruntjs.com).

### What is [Assemble](http://assemble.io)?

Assemble is a component and static site generator that makes it dead simple to build modular sites, documentation and components from reusable templates and data.

* [Documentation](http://assemble.io/docs)
* [Plugins](http://assemble.io/plugins) - Plugins extend the core functionality of Assemble.
* [Helpers](http://assemble.io/helpers) - Documentation for the helpers in the [handlebars-helpers](http://github.com/assemble/handlebars-helpers) library.

[Find out more at the Assemble website](http://assemble.io).

### What is [Bower](http://bower.io)?
Bower is a package manager for the web. It offers a generic, unopinionated solution to the problem of __front-end package management__, while exposing the package dependency model via an API that can be consumed by a more opinionated build stack.

[Find out more at the Bower website](http://bower.io).

## Release History
* 2014-11-06 v0.7.0 - Updated Gruntfile with new tasks and packages
* 2014-09-22 v0.6.2 - Removed non-required setGlobal from JS
* 2014-09-22 v0.6.1 - Updated connect to run off random port number
* 2014-06-24 v0.6.0 - Added Bower to automate front-end package management
* 2014-06-13 v0.5.0
* 2014-02-28 v0.4.0
	* Split grunt tasks for quicker 'watch'
	* Extra layouts using 'extend, content, block' method
	* Other minor fixes
* 2014-02-28 v0.3.0 - Massive update (too much to list, see commit log)
* 2014-02-17 v0.2.0 - Render components list
* 2014-02-13 v0.1.0 - Inital project upload

See also: [Releases](https://github.com/buildingblocks/bb-prototype-website/releases).

## License
[MIT License](http://building-blocks.mit-license.org)


[travis-url]: http://travis-ci.org/buildingblocks/bb-prototype-website
[travis-image]: https://secure.travis-ci.org/buildingblocks/bb-prototype-website.svg?branch=master
[dev-dependency-url]: https://david-dm.org/buildingblocks/bb-prototype-website#info=devDependencies
[dev-dependency-image]: https://david-dm.org/buildingblocks/bb-prototype-website/dev-status.svg
