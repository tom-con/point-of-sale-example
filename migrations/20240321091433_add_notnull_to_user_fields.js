/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.alterTable('users', (table) => {
		table.string('username', 16).notNullable().alter()
		table.string('salt', 32).notNullable().alter()
		table.string('hashed_password', 128).notNullable().alter()
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.alterTable('users', (table) => {
		table.string('hashed_password', 128).nullable().alter()
		table.string('salt', 32).nullable().alter()
		table.string('username', 16).nullable().alter()
	})
};
