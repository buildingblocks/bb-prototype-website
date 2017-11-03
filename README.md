> Front-end website template.

Prerequisites
=============

You will need to have git, node and gulp on your machine:

- [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- [https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

Download and install the project modules
========================================

You will need to clone the repo and then run a couple of commands to build the project

- `git clone git@github.com:buildingblocks/bb-prototype-website.git`

Change into the project directory

- `cd bb-prototype-website`

Install node modules

- `npm install`

Build the project
=================

There are a couple different ways to build

- `gulp` this will build the project and run the watch task, so any changes to the files now will cause the build to run again automatically
- `gulp serve` this will build and watch the project plus serve the site locally
- `gulp production` same as running gulp but minifies files and doesn't run the watch or serve tasks

Create markup
=============

Intro
-----
We build the html pages using a combination of .hbs partials (handlebars templates) and .json files. These are then compiled using an assemble task which has been defined in the Gruntfile.js file.

The html is written as normal html within a .hbs file. Within the .hbs file we call off to the .json file using if/else statements. 
We first write our html in a .hbs partials file. The name of this file can then be used to call this partial on multiple pages. We can control the content inside of this partial using data and data objects inside of a .json file.
In the example below we are going to create a simple hero component (this technique can be applied to any component) which has a number classes, a heading, a picture element with three different images, some simple copy and a button with external link.
First of all we would create a partial. We will call this file hero-large.hbs  It is a mixture of basic html and if/else statements.

    <div class="hero {{#if class}} {{class}} {{/if}}" {{#if heroID}} {{heroID}} {{/if}}>
    
        {{#if body}}
        <div class="hero-body">
        {{#if body.supTitle}}<p class="sup-title">{{body.supTitle}}</p>{{/if}} 
        {{#if body.title}}<h1 class="title">{{body.title}}</h1>{{/if}}	    
        {{#if body.text}}{{{body.text}}}{{/if}}
        {{#if url}}<a href="{{url}}" {{#if btnClass}}class="{{btnClass}}"{{/if}}>{{urlText}}</a>{{/if}} 
        </div>
        {{/if}}
        <div class="hero-media">
            {{#if image}}
            <picture>
                <!--[if IE 9]><video style="display: none;"><![endif]-->
                <!-- 75em = 1200px -->
                <source media="(min-width: 75em)" srcset="{{image.large.src}}">
                <!-- 37.5em = 600px -->
                <source media="(min-width: 37.5em)" srcset="{{image.medium.src}}">
                <!--[if IE 9]></video><![endif]-->
                <!--[if lt IE 9]><img srcset="{{image.large.src}}" alt="{{image.alt}}" /><![endif]-->
                <!--[if !lt IE 9]><!-->
                <img srcset="{{image.small.src}}" alt="{{image.alt}}" />
                <!--<![endif]-->
            </picture>
            {{/if}}
        </div>
    </div>


JSON
----
We would then create a .json file to store the data and data objects we want to output from our partial variables. We will call this file heroData.json 
The accompanying json for this will be as follows:

    {
     "hero": {
     "class": "hero-style-a",
                    "id": "hero_landing"
     "image": {
     "large": {
     "src": "image/1920x540.jpg"
     },
     "medium": {
     "src": "image/1200x540.jpg"
     },
     "small": {
     "src": "image/640x640.jpg"
     },
     "alt": "Hero Image"
     },
     "body": {
                           "supTitle": "Sup Title"
     "title": "This is a title",
     "text":"<p>Description ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>"
     }.
                    "url":"http://guardian.com",
     "urlText":"Button Text",
     "btnClass":"btn btn-style-b"
     }
    }
   

HTML Output
-----------

    <div class="hero hero-style-a" id="hero_landing">
        <div class="hero-body">
            <p class="sup-title">Sup Title</p>
            <h1 class="title">This is a title</h1>
            <p>Description ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
            <a href="http://guardian.com" class="btn btn-style-b">Button Text</a>
        </div>
        <div class="hero-media">
            <picture>
                <!--[if IE 9]><video style="display: none;"><![endif]-->
                <!-- 75em = 1200px -->
                <source media="(min-width: 75em)" srcset="images/1920x540.jpg">        
                <!-- 37.5em = 600px -->
                <source media="(min-width: 37.5em)" srcset="images/1200x540.jpg">
                <!--[if IE 9]></video><![endif]-->
                <!--[if lt IE 9]><img srcset="images/1920x540.jpg" alt="Hero Image" /><![endif]-->
                <!--[if !lt IE 9]><!-->
                <img srcset="images/640x640.jpg" alt="Hero Image">
                <!--<![endif]-->
            </picture>
        </div>
    </div>

* *You may have notices that some of our data is called in using double { and some is called in using triple {, triple { allows us to bring in special characters as opposed to simple strings. We can then bring in markup such as `<p class="foo">Lorem Ipsum</p>` and this will then render out correctly on the page.*


Visual Regression Testing
-------
We use backstopjs on this project for visual testing.
There is already a backstop_data folder which holds the reference images, the test images are excluded from git

To re-add the base images for testing against (shouldn't have to do this often/at all) run:
'**gulp backstop-ref**'

To run a test go to your commandline and type '**gulp backstop-test**'
This will run the tests against the reference images and when finished it will open up a browser window to show the results. If there are differences you can either fix the css and run again or if the changes are intended go back to your commandline and run '**backstop approve**' which will then overwrite the ref images with the updated test images.
