const knex = require('knex')({
	client: 'pg',
	connection: {
		host: process.env.PG_URL,
		port: process.env.PG_PORT,
		user: process.env.PG_USER,
		password: process.env.PG_PASS,
		database: process.env.PG_DB
	}
});

export async function GET(req, { params }) {
	const data = await knex('products').where('id', params.id).select('*')
	return Response.json({ data })
}

export async function PUT(req, { params }) {
	const body = await req.json()
	const { name, isPerishable, daysToPerish } = body;
	const data = await knex('products').where('id', params.id).update({
		name: name,
		is_perishable: isPerishable,
		days_to_perish: daysToPerish
	})
	return Response.json({ data })
}