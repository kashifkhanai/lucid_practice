import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  // defult database connection
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
      migrations: {
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
    // 👇 extra connection (optional) just for demo switching
    pg: {
      client: 'pg',
      connection: {
        host: env.get('DB_PG_HOST'),
        port: Number(env.get('DB_PG_PORT')),
        user: env.get('DB_PG_USER'),
        password: env.get('DB_PG_PASSWORD'),
        database: env.get('DB_PG_DATABASE'),
      },
      migrations: {
        naturalSort: true,
        paths: ['database/migrations_pg'], // optional (if you want PG migrations separately)
      },
    },
  },
})

export default dbConfig
