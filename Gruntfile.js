module.exports = function(grunt) {
	'use strict';
	require('time-grunt')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") + "\\n" %>' + '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' + '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; */ <%= "\\n" %>'
		},
		config: {
			src: 'src',
			dist: 'dist',
			prefix: 'bbproject_',
			ext: 'hbs'
		},
		watch: {
			main: {
				files: [
					'<%= config.src %>/{partials,pages,layouts}/{,*/}*.{<%= config.ext %>,yml}',
					'<%= config.src %>/assets/styles/**/*.less',
					'<%= config.src %>/assets/scripts/plugins/*.js',
					'<%= config.src %>/assets/scripts/main/**.js',
					'<%= config.src %>/assets/scripts/main/modules/**.js'
				],
				tasks: ['build_dev']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: ['<%= config.dist %>/', ]
			}
		},
		connect: {
			options: {
				port: 9000,
				livereload: 35729,
				// change this to '0.0.0.0' to access the server from outside
				hostname: 'localhost'
			},
			livereload: {
				options: {
					open: true,
					base: ['<%= config.dist %>']
				}
			}
		},
		assemble: {
			options: {
				flatten: true,
				layout: '<%= config.src %>/layouts/default.<%= config.ext %>',
				assets: '<%= config.dist %>',
				data: '<%= config.src %>/data/*.{json,yml}',
				partials: '<%= config.src %>/partials/*.<%= config.ext %>',
				helpers: '<%= config.src %>/helpers/helper-*.js',
				plugins: ['assemble-contrib-permalinks']
			},
			pages: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/pages/',
					src: '*.<%= config.ext %>',
					dest: '<%= config.dist %>/',
					rename: function(dest, src) {
						if (src.substring(0, 1) === '_') {
							return dest + src.substring(1);
						} else {
							return dest + '<%= config.prefix %>' + src;
						}
					}
				}]
			},
			comps: {
				options: {
					layout: '<%= config.src %>/layouts/default.<%= config.ext %>',
				},
				files: [{
					expand: true,
					cwd: '<%= config.src %>/partials/',
					src: '*.<%= config.ext %>',
					dest: '<%= config.dist %>/components/',
					rename: function(dest, src) {
						if (src.substring(0, 1) === '_') {
							return dest + src.substring(1);
						} else {
							return dest + '<%= config.prefix %>' + src;
						}
					}
				}]
			}
		},
		jshint: {
			options: {
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				sub: true,
				undef: true,
				boss: true,
				eqnull: true,
				globals: {
					node: true,
					exports: true,
					require: true,
					module: true,
					jQuery: true,
					$: true,
					window: true,
					console: true,
					Modernizr: true,
					clearTimeout: true,
					setTimeout: true,
					bb: true
				}
			},
			all: ['<%= config.src %>/assets/scripts/main/modules/*.js', '<%= config.src %>/assets/scripts/main/main.js', 'Gruntfile.js']
		},
		concat: {
			scripts: {
				src: ['<%= config.src %>/assets/scripts/plugins/*.js', '<%= config.src %>/assets/scripts/main/modules/*.js', '_scripts/main/*.js'],
				dest: '<%= config.dist %>/scripts/scripts.js'
			},
			ieScripts: {
				src: ['<%= config.src %>/assets/scripts/vendor/nwmatcher.js', '<%= config.src %>/assets/scripts/vendor/selectivizr.js'],
				dest: '<%= config.dist %>/scripts/ie.js'
			},
			scriptsProduction: {
				src: ['<%= config.src %>/assets/scripts/plugins.js', '<%= config.src %>/assets/scripts/main.js'],
				dest: '<%= config.dist %>/scripts/_scripts.js'
			},
			ieScriptsProduction: {
				src: ['<%= config.src %>/assets/scripts/vendor/nwmatcher.js', '<%= config.src %>/assets/scripts/vendor/selectivizr.js'],
				dest: '<%= config.dist %>/scripts/_ie.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			allscripts: {
				src: '<%= config.dist %>/scripts/_scripts.js',
				dest: '<%= config.dist %>/scripts/scripts.js'
			},
			iescripts: {
				src: '<%= config.dist %>/scripts/_ie.js',
				dest: '<%= config.dist %>/scripts/ie.js'
			}
		},
		less: {
			main: {
				options: {
					yuicompress: false
				},
				files: {
					'<%= config.dist %>/styles/main.css': '<%= config.src %>/assets/styles/less/_order.less'
				}
			},
			mainDebug: {
				options: {
					yuicompress: false,
					sourceMap: true,
					sourceMapFilename: '<%= config.dist %>/styles/main.debug.css.map',
					sourceMapRootpath: '/'
				},
				files: {
					'<%= config.dist %>/styles/main.debug.css': '<%= config.src %>/assets/styles/less/_order.less'
				}
			},
			fonts: {
				options: {
					yuicompress: false
				},
				files: {
					'<%= config.dist %>/styles/fonts.css': '<%= config.src %>/assets/styles/less/fonts.less'
				}
			},
			ie: {
				options: {
					yuicompress: false
				},
				files: {
					'<%= config.dist %>/styles/ie.css': '<%= config.src %>/assets/styles/less/_order.less'
				}
			}
		},
		cmq: {
			main: {
				files: {
					'<%= config.dist %>/styles/': '<%= config.dist %>/styles/main.css'
				}
			},
			ie: {
				files: {
					'<%= config.dist %>/styles/': '<%= config.dist %>/styles/ie.css'
				}
			}
		},
		"comment-media-queries": {
			ie: {
				files: {
					'<%= config.dist %>/styles/ie.css': '<%= config.dist %>/styles/ie.css'
				}
			}
		},
		copy: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/assets/images/',
					src: ['**'],
					dest: '<%= config.dist %>/images/'
				}, {
					expand: true,
					cwd: '<%= config.src %>/assets/temp/',
					src: ['**'],
					dest: '<%= config.dist %>/temp/'
				}, {
					expand: true,
					cwd: '<%= config.src %>/scripts/vendor/',
					src: ['**'],
					dest: '<%= config.dist %>/scripts/vendor/'
				}, {
					expand: true,
					cwd: '<%= config.src %>/assets/_bb/',
					src: ['**'],
					dest: '<%= config.dist %>/_bb'
				}]
			},
			release: {}
		},
		clean: {
			preBuild: ['<%= config.dist %>/'],
			postBuild: ['<%= config.dist %>/scripts/_scripts.js', '<%= config.dist %>/scripts/_ie.js']
		}
	});
	grunt.loadNpmTasks('assemble');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-comment-media-queries');
	grunt.loadNpmTasks('grunt-combine-media-queries');
	//Build tasks.
	grunt.registerTask('build_dev', ['jshint', 'clean:preBuild', 'assemble', 'concat:scripts', 'concat:ieScripts', 'less', 'cmq', 'comment-media-queries', 'copy:dist', 'clean:postBuild']);
	grunt.registerTask('build_release', ['jshint', 'clean:preBuild', 'concat:scriptsProduction', 'concat:ieScriptsProduction', 'less', 'cmq', 'comment-media-queries', 'uglify', 'cssmin', 'copy:dist', 'clean:postBuild']);
	// Default task.
	grunt.registerTask('default', ['build_dev'
	//'watch'
	]);
	grunt.registerTask('server', ['build_dev', 'connect:livereload', 'watch']);
	// Production task.
	grunt.registerTask('release', ['build_release']);
	// Release task.
	grunt.registerTask('deploy', ['release']);
};
