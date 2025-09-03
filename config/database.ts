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
      //........................................................................................................................
      //################################ Replication / Traffic Split ################################
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

      //........................................................................................................................
      //################################ Connection Pooling ################################
      //connetion pooling mean to maintain long-lived connections and reuse them to improve performance and reduce latency
      // here we are configuring min and max number of connections in the pool

      pool: {
        min: 2, // minimum number of connections in the pool
        max: 10, // maximum number of connections in the pool
        acquireTimeoutMillis: 60000, // waitfor 60 seconds to acquire a connection
      },
      //........................................................................................................................
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
