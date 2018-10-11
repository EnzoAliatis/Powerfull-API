'use strict'
const Hapi = require('hapi')
// good para hacer los logs
const good = require('good')


const server = Hapi.server({
  port: process.env.NODE_ENV || 3000,
  host: 'localhost'
})

const init = async () => {
  try {
    await server.register({
      plugin: good,
      options: {
        ops: {
          interval: 2000
        },
        reporters: {
          console: [
            {
              module: 'good-console'
            },
            'stdout'
          ]
        }
      }
    })
    await server.start()


  } catch (error) {
    console.error('Error lanzando el servidor', error)
    process.exit(1)
  }
  server.log('info', `Servidor lanzado en el puerto: ${server.info.uri}`)
}

process.on('unhandledRejection', error => {
  server.log('UnhandledRejection', error)
})

process.on('uncaughtException', error => {
  server.log('uncaughtException', error)
})

init()