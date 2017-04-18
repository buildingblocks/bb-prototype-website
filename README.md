> Front-end website template.

## Prerequisites

You will need to have git, node and gulp on your machine:

- [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
- [https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md)

## Download and install the project modules

You will need to clone the repo and then run a couple of commands to build the project

- `git clone git@github.com:buildingblocks/bb-prototype-website.git`

Change into the project directory

- `cd bb-prototype-website`

Install node modules

- `npm install`

## Build the project

There are a couple different ways to build

- `gulp` this will build the project and run the watch task, so any changes to the files now will cause the build to run again automatically
- `gulp serve` this will build and watch the project plus serve the site locally
- `gulp production` same as running gulp but minifies files and doesn't run the watch or serve tasks



