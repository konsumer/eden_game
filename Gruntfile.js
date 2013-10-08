module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    nodewebkit: {
      'mac': {
        'options':{
          app_name: "Eden's Game",
          credits:'./src/credits.html',
          build_dir: './build',
          mac: true,
          win: false,
          linux32: false,
          linux64: false,
        },
        src: ['./src/**/*']
      },
      'win': {
        'options':{
          app_name: "Eden's Game",
          credits:'./src/credits.html',
          build_dir: './build',
          mac: false,
          win: true,
          linux32: false,
          linux64: false,
        },
        src: ['./src/**/*']
      },
      'lin': {
        'options':{
          app_name: "Eden's Game",
          credits:'./src/credits.html',
          build_dir: './build',
          mac: false,
          win: false,
          linux32: true,
          linux64: true,
        },
        src: ['./src/**/*']
      },
    },
    
    clean: ['build'],
    
    connect: {
      server: {
        options: {
          hostname: '*',
          port: 8000,
          base: 'src',
          keepalive:true,
          open:true
        }
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-node-webkit-builder');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
  
  grunt.registerTask('default', ['nodewebkit:mac']);
  grunt.registerTask('mac', ['nodewebkit:mac']);
  grunt.registerTask('win', ['nodewebkit:win']);
  grunt.registerTask('lin', ['nodewebkit:lin']);

  grunt.registerTask('server', ['connect']);
};