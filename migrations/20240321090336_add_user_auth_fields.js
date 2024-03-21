/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.alterTable('users', (table) => {
		table.string('username', 16)
		table.string('salt', 32)
		table.string('hashed_password', 128)
	})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.alterTable('users', (table) => {
		table.dropColumn('hashed_password')
		table.dropColumn('salt')
		table.dropColumn('username')
	})
};