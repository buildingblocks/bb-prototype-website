var gutil = require('gulp-util');

module.exports = function(err) {
  // print the error to the console
  if (err) {
    console.log(err);
    process.exit();
  }
  this.emit('end');
};