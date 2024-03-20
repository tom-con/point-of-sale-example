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
	const data = await knex('stores').where('id', params.id).select('*')
	return Response.json({ data })
}

export async function PUT(req, { params }) {
	const body = await req.json()
	const { email, phone } = body;
	const data = await knex('stores').where('id', params.id).update({
		email: email,
		phone: phone
	})
	return Response.json({ data })
}