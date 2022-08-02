module.exports = {
    apps: [
      {
        name: 'FilegunDevJmm',
        exec_mode: 'cluster',
        instances: 2, // Or a number of instances
        autorestart:true,
        watch:true,
        script: './node_modules/nuxt/bin/nuxt.js',
        args: 'start'
      }
    ]
  }