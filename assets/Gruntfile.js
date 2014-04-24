/*global module:false*/
module.exports = function (grunt) {

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		banner: '',
		// Task configuration.
		concat: {
			options: {
				banner: '<%= banner %>',
				stripBanners: true
			},
			head: {
				src: [
					'js/libs/html5shiv.js',
					'js/libs/namespace/namespaces.js',
					'js/libs/angular/1.2.14/angular.js',
					'js/nordgourmet.js'
				],
				dest: '../scripts/head.js'
			},
			nordgourmet: {
				src: [
					'js/angular.nordgourmet.js',
					'js/nordgourmet.angular.controllers.js'
				],
				dest: '../scripts/nordgourmet.js'
			}
		},
		uglify: {
			options: {
				mangle: false
			},
			head: {
				src: '<%= concat.head.dest %>',
				dest: '../scripts/head.min.js'
			},
			nordgourmet: {
				src: '<%= concat.app.dest %>',
				dest: '../scripts/nordgourmet.min.js'
			}
		},
		compass: {
			dist: {
				options: {
					config: 'config.rb'
					//noLineComments: false
				}
			}
		},
		cssmin: {
			minify: {
				expand: true,
				cwd: '../css/',
				src: ['*.css', '!*.min.css', '!Icon*.css', '!RTE*.css'],
				dest: '../css/',
				ext: '.min.css'
			}
		},
		copy: {
			main: {
				files: [
					{ expand: true, cwd: 'img/', src: ['**', '!**/*.db', '!*.db'], dest: '../img/' },
					{ expand: true, cwd: 'fonts/', src: ['**'], dest: '../fonts/' },
					{ expand: true, cwd: 'icons/', src: ['*.svg', '*.eot', '*.woff', '*.ttf'], dest: '../fonts/' }
				]
			}
		},
		watch: {
			scripts: {
				files: ['<%= concat.app.src %>',
					'<%= concat.head.src %>'],
				tasks: ['concat']
			},
			images: {
				files: ['img/**',
					'img/**/*'],
				tasks: ['copy']
			},
			styles: {
				files: ['scss/**',
					'scss/**/*'
					],
				tasks: ['compass']
			},
			jade: {
				files: ["views/*.jade","views/pages/*.jade"],
				tasks: ["jade"]
			}
		},
		jade: {
			compile: {
				options: {
					pretty: true,
					data: {
						debug: false
					}
				},
				files: [ {
					cwd: "views/pages",
					src: "**/*.jade",
					dest: "../",
					expand: true,
					ext: ".html"
				} ]
			}
		},
		cactuspilot: {
			dist: {
				options: {

				},
				files: {
					'../cactus/': '../css/nordgourmet.css'
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jade');
	// Default task.
	grunt.registerTask('default', ['concat', 'copy', 'compass', 'cssmin', 'jade']);
	grunt.registerTask('dev', ['concat', 'copy', 'compass', 'jade', 'watch']);
	grunt.registerTask('renderview', ['jade']);
};