require('dotenv').config({ path: ['.env.local', '.env'] })

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

	development: {
		client: 'pg',
		connection: {
			database: process.env.PG_DB,
			user: process.env.PG_USER,
			password: process.env.PG_PASS
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},

	staging: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	},

	production: {
		client: 'postgresql',
		connection: {
			database: 'my_db',
			user: 'username',
			password: 'password'
		},
		pool: {
			min: 2,
			max: 10
		},
		migrations: {
			tableName: 'knex_migrations'
		}
	}

};
