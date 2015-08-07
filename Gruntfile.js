module.exports = function(grunt) {

	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		revision: {
			options: {
				property: 'meta.revision',
				ref: 'HEAD'
			}
		},

		useminPrepare: {
			html: 'index.html',
			options: {
				dest: 'build',
				root: 'build'
			}
		},

		usemin: {
			html: ['build/index.html']
		},

		copy:{
			html: {
				src: './index.html',
				dest: 'build/index.html'
			}
		},

		clean: {
			release: ['build/*', 'zipped/*', 'replaced/*']
		},

		webfont: {
			icons: {
				src: 'icons/*.svg',
				dest: 'build/fonts',
				destCss: 'build/css',
				options: {
					stylesheet: 'scss',
					relativeFontPath: '/build/fonts',
					templateOptions: {
				        baseClass: 'icon',
				        classPrefix: 'icon-',
				        mixinPrefix: 'icon-'
				    }
				}
			}
		},

		csslint: {
			strict: {
				options: {
					import: 2
				},
				src: ['css/*.css']
			},
			lax: {
				options: {
					import: false
				},
				src: ['css/*.css']
			}
		},

		notify: {
			csslint: {
				options: {
					title: 'Finished CSS linting',  // optional
					message: 'Good work champ. Keep it up!', //required
				}
			},
			webfont: {
				options: {
					title: 'Web fonts',  // optional
					message: 'We haz made dem.'
				}
			}
		},

		'string-replace': {
			dist: {
				files: {
				  'replaced/text.txt': 'replace/text.txt',
				},
				options: {
					replacements: [{
						pattern: 'hurro',
						replacement: 'hello'
					}]
				}
			}
		},

		zip: {
			'long-format': {
				dest: 'zipped/<%= meta.revision %>.zip',
				src: ['replaced/text.txt', 'replace/text.txt']
			}
		}
	});

	grunt.loadNpmTasks('grunt-usemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-webfont');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-git-revision');
	grunt.loadNpmTasks('grunt-zip');

	grunt.registerTask('default', ['revision', 'clean:release', 'useminPrepare', 'concat:generated', 'uglify:generated', 'cssmin:generated', 'csslint:strict', 'notify', 'string-replace:dist', 'zip:long-format', 'copy:html', 'usemin']);


};
