import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'mysql',
  connections: {
    mysql: {
      client: 'mysql2',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      // // it is possible to configure read and write connections to handle traffic split and use when we have multiple DB servers
      // // it improves performance and reliability
      // replicas: {
      //   read: {
      //     connection: [{ host: env.get('DB_HOST1_READ') }, { host: env.get('DB_HOST2_READ') }],
      //   },
      //   write: {
      //     connection: { host: env.get('DB_HOST_WRITE') },
      //   },
      // },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
