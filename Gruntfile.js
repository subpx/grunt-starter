module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		revision: {
			options: {
				property: 'meta.revision',
				ref: 'HEAD',
				short: true
			}
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
	
	grunt.loadNpmTasks('grunt-webfont');
	grunt.loadNpmTasks('grunt-contrib-csslint');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-string-replace');
	grunt.loadNpmTasks('grunt-git-revision');
	grunt.loadNpmTasks('grunt-zip');
	
	grunt.registerTask('default', ['revision', 'webfont','csslint:strict', 'notify', 'string-replace:dist', 'zip:long-format']);


};