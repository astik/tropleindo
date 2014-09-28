'use strict';

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		yeoman: {
			// configurable paths
			app: require('./bower.json').appPath || 'app',
			dist: 'dist',
			tmp: '.tmp'
		},
		watch: {
			angularCombine: {
				files: [ '<%= yeoman.app %>/views/{,*/}*/*.html' ],
				tasks: [ 'angularCombine' ]
			},
			js: {
				files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
				tasks: ['jshint:all'],
				options: {
					livereload: true
				}
			},
			jsTest: {
				files: ['test/spec/{,*/}*.js'],
				tasks: ['jshint:test', 'karma']
			},
			less: {
				files: [ '<%= yeoman.app %>/less/*.less' ],
				tasks: [ 'less', 'autoprefixer' ]
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/**/*.html',
					'<%= yeoman.tmp %>/styles/*.css',
					'<%= yeoman.app %>/scripts/**/*.js',
					'<%= yeoman.app %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},
		connect: {
			options: {
				port: 9000,
				hostname: '*',
				livereload: 35729
			},
			livereload: {
				options: {
					open: false,
					middleware: function (connect, options) {
						var middlewares = [];
						middlewares.push(function (req, res, next) {
							// uncomment to have log access request
							console.log(req.method, req.originalUrl);
							next();
						});
						// Serve static files.
						if (!Array.isArray(options.base)) {
							options.base = [ options.base ];
						}
						options.base.forEach(function (base) {
							middlewares.push(connect.static(base));
						});
						// Make directory browse-able.
						var directory = options.directory || options.base[options.base.length - 1];
						middlewares.push(connect.directory(directory));
						return middlewares;
					},
					base: [
						'mock',
						'<%= yeoman.tmp %>',
						'<%= yeoman.app %>',
						'bower_components',
						'bower_components/bootstrap',
						'mock'
					]
				}
			},
			test: {
				options: {
					port: 9001,
					base: [
						'<%= yeoman.tmp %>',
						'test',
						'<%= yeoman.app %>'
					]
				}
			},
			dist: {
				options: {
					base: '<%= yeoman.dist %>'
				}
			}
		},
		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/**/*.js'
			],
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/{,*/}*.js']
			}
		},
		clean: {
			dist: {
				files: [
					{
						dot: true,
						src: [
							'<%= yeoman.tmp %>',
							'<%= yeoman.dist %>/*',
							'!<%= yeoman.dist %>/.git*'
						]
					}
				]
			},
			server: '<%= yeoman.tmp %>'
		},
		autoprefixer: {
			options: [ 'last 1 version' ],
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.tmp %>/styles/',
						src: '{,*/}*.css',
						dest: '<%= yeoman.tmp %>/styles/'
					}
				]
			}
		},
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
						'<%= yeoman.dist %>/styles/fonts/*'
					]
				}
			}
		},
		useminPrepare: {
			html: '<%= yeoman.app %>/index.html',
			options: {
				dest: '<%= yeoman.dist %>',
				flow: {
					html: {
						steps: {
							js: ['concat', 'uglifyjs'],
							css: ['cssmin']
						},
						post: {}
					}
				}
			}
		},
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>']
			}
		},
		imagemin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>/images',
						src: '{,*/}*.{png,jpg,jpeg,gif}',
						dest: '<%= yeoman.dist %>/images'
					}
				]
			}
		},
		svgmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>/images',
						src: '{,*/}*.svg',
						dest: '<%= yeoman.dist %>/images'
					}
				]
			}
		},
		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.dist %>',
						src: ['*.html', 'views/{,*/}*.html'],
						dest: '<%= yeoman.dist %>'
					}
				]
			}
		},
		ngmin: {
			dist: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.tmp %>/concat/scripts',
						src: '*.js',
						dest: '<%= yeoman.tmp %>/concat/scripts'
					}
				]
			}
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '<%= yeoman.app %>',
						dest: '<%= yeoman.dist %>',
						src: [
							'*.{ico,png,txt}',
							'.htaccess',
							'*.html',
							'views/{,*/}*.html',
							'images/{,*/}*.{webp}',
							'fonts/*'
						]
					},
					{
						expand: true,
						cwd: '<%= yeoman.dist %>/images',
						dest: '<%= yeoman.dist %>/images',
						src: ['generated/*']
					},
					{
						expand: true,
						cwd: 'bower_components/bootstrap/',
						dest: '<%= yeoman.dist %>',
						src: ['fonts/*']
					}
				]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>/styles',
				dest: '<%= yeoman.dist %>/styles/',
				src: '{,*/}*.css'
			}
		},
		concurrent: {
			server: [
				'copy:styles'
			],
			test: [
				'copy:styles'
			],
			dist: [
				'copy:styles',
				'imagemin',
				'svgmin'
			]
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		},
		angularCombine: {
			combined: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>',
						src: 'views/*',
						dest: '<%= yeoman.app %>/combined',
						filter: 'isDirectory'
					}
				]
			}
		},
		less: {
			development: {
				files: [
					{
						expand: true,
						cwd: '<%= yeoman.app %>/less',
						src: [ 'bootstrap.less', 'screen.less' ],
						dest: '<%= yeoman.tmp %>/styles',
						ext: '.css'
					}
				]
			}
		},
		release: {
			options: {
				npm: false
			}
		},
		manifest: {
			generate: {
				options: {
					basePath: 'dist',
					cache: [],
					network: [],
					fallback: [],
					exclude: [],
					preferOnline: false,
					verbose: true,
					timestamp: true,
					hash: true,
					master: ['index.html']
				},
				src: [
					'fonts/*',
					'scripts/*',
					'styles/*',
					'views/*'
				],
				dest: 'dist/manifest.appcache'
			}
		}
	});

	grunt.registerTask('serve', function (target) {
		if (target === 'dist') {
			return grunt.task.run(['build', 'connect:dist:keepalive']);
		}

		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'angularCombine',
			'less',
			'autoprefixer',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('test', [
		'clean:server',
		'concurrent:test',
		'autoprefixer',
		'connect:test',
		'karma'
	]);

	grunt.registerTask('build', [
		'clean:dist',
		'useminPrepare',
		'concurrent:dist',
		'angularCombine',
		'less',
		'autoprefixer',
		'concat',
		'ngmin',
		'copy:dist',
		'cssmin',
		'uglify',
		'rev',
		'usemin',
		'htmlmin',
		'manifest'
	]);

	grunt.registerTask('default', [
		'jshint',
		/*'test',*/
		'build'
	]);
};
