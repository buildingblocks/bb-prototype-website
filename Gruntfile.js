module.exports = function(grunt) {
	'use strict';
	// Reads package.json and dynamically loads all Grunt tasks
	require('load-grunt-tasks')(grunt, {
		scope: 'devDependencies',
		pattern: ['assemble', 'grunt-*']
	});
	// Times tasks
	require('time-grunt')(grunt);

	// Project build configuration
	grunt.initConfig({
		bowerrc: grunt.file.readJSON('.bowerrc'),
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> */ \n'
		},
		config: {
			gruntfile: 'Gruntfile.js',
			// Component settings
			bower: '<%= bowerrc.directory %>',
			// Src settings
			src: 'src',
			srcAssets: 'assets',
			srcFonts: 'fonts',
			srcImages: 'images',
			srcScripts: 'scripts',
			srcModules: 'modules',
			srcPlugins: 'plugins',
			srcStyles: 'styles',
			srcTemp: 'temp',
			mainLess: '_order.less',
			// Dist settings
			dist: 'dist',
			distDocs: 'docs',
			distJsDocs: 'jsdocs',
			distFonts: 'fonts',
			distImages: 'images',
			distScripts: '_scripts',
			distStyles: '_styles',
			distTemp: 'temp',
			mainCss: 'main.css',
			ieCss: 'ie.css',
			mainRtlCss: 'main.rtl.css',
			ieRtlCss: 'ie.rtl.css',
			// Project settings
			assembleExt: 'hbs',
			helpers: 'helpers',
			pagePrefix: '<%= pkg.name %>_',
			livereloadPort: function() {
				var min = 35729,
					max = min + 1000,
					port = Math.floor(Math.random() * (max - min + 1)) + min;
				return port;
			}
		},

		// File watchers
		watch: {
			gruntfile: {
				files: [
					'<%= config.gruntfile %>'
				],
				tasks: [
					'jshint:gruntfile'
				]
			},
			html: {
				files: [
					'<%= config.src %>/{data,pages,partials,layouts}/**/*.{<%= config.assembleExt %>,json}',
				],
				tasks: [
					'build_html'
				]
			},
			scripts: {
				files: [
					'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/**/**.js',
				],
				tasks: [
					'build_scripts',
					'modernizr'
				]
			},
			styles: {
				files: [
					'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/*.css',
					'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/**/*.less',
					'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/_mixins/mixins-*.less'
				],
				tasks: [
					'build_styles',
					'modernizr'
				]
			},
			livereload: {
				options: {
					livereload: parseInt('<%= config.livereloadPort %>', 10)
				},
				files: [
					'<%= config.dist %>/**/*.html',
					'<%= config.dist %>/<%= config.distAssets %>/**/*.css',
					'<%= config.dist %>/<%= config.distAssets %>/**/*.js',
					'<%= config.dist %>/<%= config.distAssets %>/**/*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// Local server
		connect: {
			server: {
				options: {
					// port: 0,
					livereload: true,
					useAvailablePort: true,
					// change this to '0.0.0.0' to access the server from outside
					hostname: 'localhost',
					open: true,
					base: '<%= config.dist %>'
				}
			}
		},

		// HTML tasks
		assemble: {
			options: {
				flatten: false,
				layout: false,
				pagePrefix: '<%= config.pagePrefix %>',
				partials: [
					'<%= config.src %>/{layouts,partials}/**/*.<%= config.assembleExt %>'
				],
				helpers: [
					'<%= config.src %>/<%= config.helpers %>/helper-*.js'
				],
				assets: '<%= config.dist %>',
				images: '<%= config.distImages %>',
				styles: '<%= config.distStyles %>',
				scripts: '<%= config.distScripts %>',
				temp: '<%= config.distTemp %>',
				mainCss: '<%= config.mainCss %>',
				mainRtlCss: '<%= config.mainRtlCss %>',
				ieCss: '<%= config.ieCss %>',
				ieRtlCss: '<%= config.ieRtlCss %>',
				data: [
					'<%= config.src %>/data/**/*.json',
					'package.json',
				],
				timestamp: '<%= grunt.template.today("mmm dS yyyy, h:MMtt Z") %>',
				copyrightYear: '<%= grunt.template.today("yyyy") %>'
			},
			pages: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/pages/',
					src: ['**/*.<%= config.assembleExt %>'],
					dest: '<%= config.dist %>/',
					rename: function(dest, src) {
						var filename = src;
						if (src.substring(0, 1) === '_') {
							filename = dest + src.substring(1);
						} else if (src.indexOf('/') !== -1) {
							var index = null,
								splitSrc = src.split('/');
							filename = dest + '<%= config.pagePrefix %>';
							for (index = 0; index < splitSrc.length; ++index) {
								filename = filename + splitSrc[index];
								if (src.indexOf('.<%= config.assembleExt %>')) {
									filename = filename + '-';
								}
							}
						} else {
							filename = dest + '<%= config.pagePrefix %>' + src;
						}
						return filename;
					}
				}]
			}
		},

		// Script tasks
		jsbeautifier: {
			options: {
				config: '.jsbeautifyrc',
			},
			all: {
				src: [
					'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/<%= config.srcModules %>/**/*.js',
					'<%= config.gruntfile %>'
				]
			}
		},

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/<%= config.srcModules %>/**/*.js',
				'<%= config.gruntfile %>'
			],
			gruntfile: {
				src: '<%= config.gruntfile %>'
			}
		},

		concat: {
			lessMixins: {
				src: [
					'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/_mixins/*.less'
				],
				dest: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/_mixins/_combined.less'
			},
			jquery: {
				src: [
					'<%= config.bower %>/jquery/dist/jquery.js'
				],
				dest: '<%= config.dist %>/<%= config.distScripts %>/jquery.js'
			},
			scripts: {
				src: [
					// Add 3rd party Bower components here using <%= config.bower %>/**/*.js
					'<%= config.bower %>/console-polyfill/index.js',
					'<%= config.bower %>/jquery-tiny-pubsub/dist/ba-tiny-pubsub.min.js',
					'<%= config.bower %>/picturefill/dist/picturefill.min.js',
					// Our scripts
					'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/<%= config.srcPlugins %>/combine/*.js',
					'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/<%= config.srcModules %>/*.js',
					'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/_init.js'
				],
				dest: '<%= config.dist %>/<%= config.distScripts %>/scripts.js'
			},
			ieScripts: {
				src: [
					// Add 3rd party Bower components here using <%= config.bower %>/**/*.js
					'<%= config.bower %>/nwmatcher/src/nwmatcher.js',
					'<%= config.bower %>/selectivizr/selectivizr.js'
				],
				dest: '<%= config.dist %>/<%= config.distScripts %>/ie.js'
			},
			validation: {
				src: [
					// @todo: jquery validation as component - just double check the component is all working first though.
					'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/<%= config.srcPlugins %>/validation/*.js'
				],
				dest: '<%= config.dist %>/<%= config.distScripts %>/validation.js'
			},
			modernizr: {
				src: [
					'<%= config.dist %>/<%= config.distScripts %>/modernizr.js',
					'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/<%= config.srcPlugins %>/modernizr.tests.js'
				],
				dest: '<%= config.dist %>/<%= config.distScripts %>/modernizr.js'
			}
		},

		uglify: {
			options: {
				preserveComments: 'some',
				mangle: true,
				compress: {
					drop_console: true
				}
			},
			jquery: {
				src: '<%= config.dist %>/<%= config.distScripts %>/jquery.js',
				dest: '<%= config.dist %>/<%= config.distScripts %>/jquery.js'
			},
			scripts: {
				src: '<%= config.dist %>/<%= config.distScripts %>/scripts.js',
				dest: '<%= config.dist %>/<%= config.distScripts %>/scripts.min.js'
			},
			ieScripts: {
				src: '<%= config.dist %>/<%= config.distScripts %>/ie.js',
				dest: '<%= config.dist %>/<%= config.distScripts %>/ie.js'
			},
			modernizr: {
				src: '<%= config.dist %>/<%= config.distScripts %>/modernizr.js',
				dest: '<%= config.dist %>/<%= config.distScripts %>/modernizr.js'
			}
		},

		// Style tasks
		less: {
			main: {
				files: {
					'<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>': '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/<%= config.mainLess %>'
				}
			},
			rtl: {
				files: {
					'<%= config.dist %>/<%= config.distStyles %>/<%= config.mainRtlCss %>': '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/<%= config.mainLess %>'
				}
			}
		},

		stripmq: {
			ie: {
				files: {
					'<%= config.dist %>/<%= config.distStyles %>/<%= config.ieCss %>': '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>'
				}
			},
			ieRtl: {
				files: {
					'<%= config.dist %>/<%= config.distStyles %>/<%= config.ieRtlCss %>': '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainRtlCss %>'
				}
			}
		},

		postcss: {
			options: {
				map: false,
				processors: [
					require('autoprefixer')({
						browsers: [
							'last 3 version',
							'ie 8',
							'ie 9'
						]
					}),
					require('postcss-pxtorem')({
						root_value: 16,
						unit_precision: 5,
						prop_white_list: [],
						selector_black_list: ['border-radius', 'letter-spacing'],
						replace: true,
						media_query: true
					})
				]
			},
			dist: {
				src: '<%= config.dist %>/<%= config.distStyles %>/*.css'
			}
		},

		combine_mq: {
			main: {
				expand: true,
				flatten: true,
				src: '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>',
				dest: '<%= config.dist %>/<%= config.distStyles %>/'
			}
		},

		cssmin: {
			options: {
				advanced: false,
				rebase: false,
				compatibility: 'ie8'
			},
			main: {
				src: '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>',
				dest: '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>'
			},
			mainRtl: {
				src: '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainRtlCss %>',
				dest: '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainRtlCss %>'
			},
			ie: {
				src: '<%= config.dist %>/<%= config.distStyles %>/<%= config.ieCss %>',
				dest: '<%= config.dist %>/<%= config.distStyles %>/<%= config.ieCss %>'
			},
			ieRtl: {
				src: '<%= config.dist %>/<%= config.distStyles %>/<%= config.ieRtlCss %>',
				dest: '<%= config.dist %>/<%= config.distStyles %>/<%= config.ieRtlCss %>'
			}
		},

		csscomb: {
			options: {
				config: '.csscomb.json'
			},
			all: {
				files: {
					'<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>': [
						'<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>'
					]
				}
			}
		},

		csslint: {
			main: {
				options: {
					csslintrc: '.csslintrc'
				},
				src: '<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>'
			}
		},

		// Misc tasks
		modernizr: {
			dist: {
				'devFile': '<%= config.bower %>/modernizr/modernizr.js',
				'outputFile': '<%= config.dist %>/<%= config.distScripts %>/modernizr.js',
				'parseFiles': true,
				'files': {
					'src': [
						'<%= config.dist %>/<%= config.distScripts %>/*.js',
						'<%= config.dist %>/<%= config.distStyles %>/*.css'
					]
				},
				'extra': {
					'shiv': true,
					'printshiv': false,
					'load': true,
					'mq': false,
					'cssclasses': true
				},
				'extensibility': {
					'addtest': false,
					'prefixed': false,
					'teststyles': false,
					'testprops': false,
					'testallprops': false,
					'hasevents': false,
					'prefixes': false,
					'domprefixes': false
				}
			}
		},

		// Project tasks
		copy: {
			bb: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/<%= config.srcAssets %>/_bb/',
					src: ['**'],
					dest: '<%= config.dist %>/_bb/'
				}]
			},
			assets: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcImages %>/',
					src: ['**'],
					dest: '<%= config.dist %>/<%= config.distImages %>/'
				}, {
					expand: true,
					cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcFonts %>/',
					src: ['**'],
					dest: '<%= config.dist %>/<%= config.distStyles %>/<%= config.distFonts %>/'
				}, {
					expand: true,
					cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcTemp %>/',
					src: ['**'],
					dest: '<%= config.dist %>/<%= config.distTemp %>/'
				}]
			},
			scripts: {
				files: [{
					expand: true,
					cwd: '<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/<%= config.srcPlugins %>',
					src: [
						'*.js',
						'!*.tests.js'
					],
					dest: '<%= config.dist %>/<%= config.distScripts %>/'
				}]
			},
			deploy: {
				files: [{
					expand: true,
					cwd: '<%= config.dist %>/',
					src: ['**'],
					dest: '<%= grunt.option(\'dest\') %>'
				}]
			}
		},

		clean: {
			production: [
				'<%= config.dist %>/<%= config.distStyles %>/<%= config.mainCss %>.map'
			],
			html: [
				'<%= config.dist %>/*.html'
			],
			scripts: [
				'<%= config.dist %>/<%= config.distScripts %>'
			],
			styles: [
				'<%= config.dist %>/<%= config.distStyles %>'
			],
			mixins: [
				'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcStyles %>/_mixins/_combined.less'
			],
			everything: [
				'<%= config.dist %>'
			],
			deploy: []
		},

		// Production tasks
		prettify: {
			options: {
				'indent': 1,
				'indent_char': '	',
				'indent_scripts': 'normal',
				'wrap_line_length': 0,
				'brace_style': 'collapse',
				'preserve_newlines': true,
				'max_preserve_newlines': 1,
				'unformatted': [
					'code',
					'pre'
				]
			},
			deploy: {
				expand: true,
				cwd: '<%= config.dist %>/',
				ext: '.html',
				src: ['*.html'],
				dest: '<%= config.dist %>/'
			}
		},

		zip: {
			deploy: {
				cwd: '<%= config.dist %>/',
				src: ['<%= config.dist %>/**/*'],
				dest: 'dist.zip'
			}
		},

		// Documentation tasks
		jsdoc: {
			all: {
				src: [
					'Gruntfile.js',
					'<%= config.src %>/<%= config.srcAssets %>/<%= config.srcScripts %>/<%= config.srcModules %>/*.js'
				],
				options: {
					destination: '<%= config.dist %>/<%= config.distDocs %>/<%= config.distJsDocs %>'
				}
			}
		}
	});

	// Build tasks.
	grunt.registerTask('build_html', [
		'assemble',
		'copy:assets'
	]);
	grunt.registerTask('build_scripts', [
		'jsbeautifier',
		'jshint',
		'concat:jquery',
		'concat:scripts',
		'concat:ieScripts',
		'concat:validation',
		'uglify:scripts',
		'copy:scripts'
	]);
	grunt.registerTask('build_styles', [
		'concat:lessMixins',
		'less',
		'stripmq',
		'postcss',
		'combine_mq',
		'csscomb',
		'csslint',
		'copy:assets',
		'clean:mixins'
	]);
	grunt.registerTask('build_dev', [
		'clean:html',
		'build_html',
		'clean:scripts',
		'build_scripts',
		'jsdoc',
		'clean:styles',
		'build_styles',
		'modernizr',
		'concat:modernizr',
		'copy:bb'
	]);
	grunt.registerTask('build_production', [
		'build_dev',
		'cssmin',
		'uglify',
		'prettify',
		'clean:production'
	]);
	// Default
	grunt.registerTask('default', [
		'clean:everything',
		'build_dev',
		'watch'
	]);
	// Local server
	grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function(target) {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve:' + target]);
	});
	grunt.registerTask('serve', [
		'clean:everything',
		'build_dev',
		'connect',
		'watch'
	]);
	// Production
	grunt.registerTask('deploy', [
		'build_production',
		'copy:deploy',
		'clean:deploy',
		'zip:deploy'
	]);
};
