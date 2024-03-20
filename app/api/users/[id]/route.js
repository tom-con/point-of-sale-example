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
	const data = await knex('users').where('id', params.id).select('*')
	return Response.json({ data })
}

export async function PUT(req, { params }) {
	const body = await req.json()
	const { salary, firstName, lastName } = body;
	const data = await knex('users').where('id', params.id).update({
		salary: salary,
		firstname: firstName,
		lastname: lastName
	})
	return Response.json({ data })
}